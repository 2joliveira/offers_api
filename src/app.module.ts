import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env/env';
import { EnvModule } from './config/env/env.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
