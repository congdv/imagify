import fs from 'fs';

import { parseData, catchErrors } from 'core/errors';
import { createEntity, findEntityOrThrow } from 'core/utils/typeorm';
import { User } from 'shared/dto/User.dto';
import { PageOptionsDto } from 'core/dto/page-options.dto';
import { PageMetaDto } from 'core/dto/page-meta.dto';
import { DTO } from 'core/utils/dto';
import { Image } from './schema';
import { UploadImageDto } from './dto/upload-image.dto';
import { SearchImageDto } from './dto/search-image.dto';
import { ImagePageRespDto, ImageRespDto } from './dto/image-resp.dto';

export const uploadImage = parseData(async (images: UploadImageDto, currentUser: User): Promise<
  any
> => {
  let savedImages: any = [];
  for (const image of images.images) {
    const savedImage = await createEntity(Image, {
      ...image,
      originName: image.originalname,
      url: image.path,
      mimeType: image.mimetype,
      user: currentUser.id as any,
    });
    savedImages = [...savedImages, savedImage];
  }
  return savedImages;
}, UploadImageDto);

export const getImages = parseData(
  async (images: SearchImageDto, currentUser: User, pagination: PageOptionsDto): Promise<any> => {
    console.log(images, currentUser);
    const [savedImages, count] = await Image.findAndCount({
      where: { user: currentUser.id },
      take: pagination.take,
      skip: pagination.skip,
      order: {
        id: pagination.order,
      },
    } as any);
    const pageMeta = new PageMetaDto(pagination, count);
    return new ImagePageRespDto(DTO.toDto(ImageRespDto, savedImages) as ImageRespDto[], pageMeta);
  },
  SearchImageDto,
);

export const getImage = catchErrors(async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const savedImage = await findEntityOrThrow(Image, imageId);
    res.setHeader('Content-Type', savedImage.mimeType);
    fs.createReadStream(savedImage.url).pipe(res);
  } catch (error) {
    next(error);
  }
});
