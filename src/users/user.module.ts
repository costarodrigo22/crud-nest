import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './UserController';
import { UserModel } from './User.model';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
