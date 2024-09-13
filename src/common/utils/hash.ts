import { compareSync, genSalt, hash } from 'bcrypt';

export class Hash {
  static async make(data: string | Buffer) {
    const salt = await genSalt();
    return hash(data, salt);
  }

  static compare(data: string | Buffer, encrypted: string): boolean {
    return compareSync(data, encrypted);
  }
}
