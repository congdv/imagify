import { hash, compare } from 'bcrypt';
import { catchErrors, AuthenticationError, parseData } from 'core/errors';
import { signToken } from 'core/utils/authToken';
import { createEntity } from 'core/utils/typeorm';
import { DTO } from 'core/utils/dto';
import { User } from './schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { CreateUserRespDto } from './dto/CreateUserResp.dto';

export const createAccount = parseData(async (user: CreateUserDto): Promise<any> => {
  const saltRounds = 10;
  const hashPassword = await hash(user.password, saltRounds);
  const savedUser = await createEntity(User, { ...user, password: hashPassword });
  return DTO.toDto(CreateUserRespDto, { authToken: signToken({ sub: savedUser.id }) });
}, CreateUserDto);

export const loginAccount = catchErrors(async (req, res, next) => {
  try {
    const savedUser = await User.findOne({ email: req.body.email });
    if (!savedUser) {
      throw new AuthenticationError();
    }
    const isValid = await compare(req.body.password, savedUser.password);
    if (!isValid) {
      throw new AuthenticationError();
    }
    res.respond({
      authToken: signToken({ sub: savedUser.id }),
    });
  } catch (error) {
    next(error);
  }
});
