// src\route\api\v1\user\user.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/constant/database/model/user.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

const swaggerTag = 'User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: User, isArray: true })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(+id);
  }

  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return user;
  }
  
  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Soft delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User soft deleted successfully' })
  @Delete(':id')
  softDelete(@Param('id') id: string): Promise<any> {
    return this.userService.softDelete(+id);
  }

  @ApiTags(swaggerTag)
  @ApiOperation({ summary: 'Restore soft deleted user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User restore successful' })
  @Post(':id/restore')
  restoreSoftDelete(@Param('id') id: string): Promise<void> {
    return this.userService.restoreSoftDelete(+id);
  }
}
