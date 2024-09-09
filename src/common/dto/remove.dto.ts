import { IsCustomBoolean } from '@/common/decorators/validators/is-boolean.decorator';
export class RemoveDto {
  @IsCustomBoolean()
  readonly soft: boolean;
}
