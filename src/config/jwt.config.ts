import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_TTL,
    },
  };
  return config;
});
