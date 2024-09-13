import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
export const IS_PUBLIC_KEY = 'isPublic';

export const DEFAULT_PAGE_SIZE = {
  USER: 2,
  CATEGORY: 4,
  ORDER: 4,
  DEFAULT: 4,
  PRODUCT: 5,
} as const satisfies Record<string, number>;
