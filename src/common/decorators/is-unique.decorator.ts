import { IsUniqueValidator } from './../validators/is-unique.validator';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export function IsUnique<T extends ObjectLiteral>(
  entity: EntityTarget<T>,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity, property],
      options: validationOptions,
      validator: IsUniqueValidator,
    });
  };
}
