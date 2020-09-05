/**
 * Reference https://github.com/oldboyxx/jira_clone/blob/master/api/src/utils/typeorm.ts
 */
import { User } from 'user/schema';
import { Image } from 'image/schema';
import { BadUserInputData, EntityNotFoundError } from 'core/errors';
import { generateErrors } from 'core/utils/validation';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm';

type EntityConstructor = typeof User | typeof Image;
type EntityInstance = User | Image;

const entities: { [key: string]: EntityConstructor } = {
  User,
  Image,
};

export const findEntities = async <T extends EntityConstructor>(
  Constructor: T,
  options?: FindManyOptions,
): Promise<InstanceType<T>[]> => {
  const instances = await Constructor.find(options);
  return instances;
};

export const findEntitiesPagination = async <T extends EntityConstructor>(
  Constructor: T,
  options?: FindManyOptions,
  take?: number,
  skip?: number,
): Promise<InstanceType<T>[]> => {
  const instances = await Constructor.find({ ...options, take, skip });
  return instances;
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions,
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOne(id, options);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ('validations' in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputData({ fields: errorFields });
    }
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  const savedInstance = validateAndSaveEntity(instance as InstanceType<T>);
  return savedInstance;
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};
