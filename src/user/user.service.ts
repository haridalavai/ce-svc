import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { ManagementClient } from 'auth0';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('AUTH0_MANAGEMENT_CLIENT')
    private auth0ManagementClient: ManagementClient,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.prismaService.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (existUser) {
        throw new BadRequestException('Email already exists');
      }

      const user = this.prismaService.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      const users = this.prismaService.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
