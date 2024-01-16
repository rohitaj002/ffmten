// src/route/api/v1/v1.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllEntities } from 'src/constant/database/model';

@Module({
  imports: [TypeOrmModule.forFeature(AllEntities)],
  controllers: [UserController],
  providers: [UserService],
})
export class V1Module {}
