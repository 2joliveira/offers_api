import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { UsersRepository } from 'src/database/prisma/repositories/users-repository';
import { Public } from './public';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { BcryptHasher } from 'src/common/utils/cryptography/bcrypt-hasher';
import { JwtEncrypter } from 'src/common/utils/cryptography/jwt-encrypter';

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/signin')
@Public()
export class AuthenticateController {
  constructor(
    private usersRepository: UsersRepository,
    private bcryptHasher: BcryptHasher,
    private jwtEncrypter: JwtEncrypter,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async signin(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.bcryptHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtEncrypter.encrypt({
      sub: user.id.toString(),
    });

    return {
      access_token: accessToken,
    };
  }
}
