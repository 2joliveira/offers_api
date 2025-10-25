import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [JwtEncrypter, BcryptHasher],
  exports: [JwtEncrypter, BcryptHasher],
})
export class CryptographyModule {}
