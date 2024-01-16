// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/constant/database/model/user.entity';
import { AllEntities } from 'src/constant/database/model';

@Module({
  imports: [TypeOrmModule.forFeature(AllEntities)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
