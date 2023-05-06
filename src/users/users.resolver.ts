import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Query('getUser')
  @UseGuards(GqlAuthGuard)
  findOneById(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
