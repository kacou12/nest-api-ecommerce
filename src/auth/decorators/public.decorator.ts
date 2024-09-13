import { IS_PUBLIC_KEY } from '@/common/utils/common.constants';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
