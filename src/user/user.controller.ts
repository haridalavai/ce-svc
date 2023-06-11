import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InternalApiGuard } from 'src/guards/InternalApiGuard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { UserPermissions } from './user.permissions';
import { AuthUser } from 'src/decorators/auth-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions(UserPermissions.CreateUsers)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(UserPermissions.ReadUsers)
  find(@AuthUser() user: any) {
    console.log(user);
    return this.userService.findOne(user.id);
  }

  @Post('internal/create')
  @UseGuards(InternalApiGuard)
  createInternal(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getAllUsers')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(UserPermissions.SuperUser)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(UserPermissions.SuperUser)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(UserPermissions.SuperUser)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions(UserPermissions.SuperUser)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
