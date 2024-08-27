import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {
  private repository: Repository<ObjectLiteral>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;
    if (!this.dataSource) {
      throw new Error('DataSource is not available.');
    }

    this.repository = this.dataSource.getRepository(entityClass);

    const count = await this.repository.count({ where: { [property]: value } });
    return count === 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, property] = args.constraints;
    return `${property} with value '${args.value}' already exists in ${entityClass.name}.`;
  }
}
