import * as _ from 'lodash';
import { plainToClass, ClassTransformOptions } from 'class-transformer';

const classTransformerOpts = {
  strategy: 'excludeAll',
  enableImplicitConversion: true,
} as ClassTransformOptions;

export class DTO {
  /**
   * convert schema to dto class instance
   * @param {{new(schema: E, options: any): T}} model
   * @param {E[] | E} schema
   * @param options
   * @returns {T[] | T}
   */
  public static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E | E[]): T | T[] {
    if (_.isArray(entity)) {
      return entity.map(u => {
        return plainToClass(model, u, classTransformerOpts);
      });
    }

    return plainToClass(model, entity, classTransformerOpts);
  }
}
