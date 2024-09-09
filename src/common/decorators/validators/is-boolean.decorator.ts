import { ToBoolean } from './../transformers/toBoolean.decorator';
import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean,
  IsInt,
  IsPositive,
  ValidationOptions,
} from 'class-validator';

/**
 * Check if the value is a boolean , work with query params
 */
export const IsCustomBoolean = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(IsBoolean(validationOptions), ToBoolean());
