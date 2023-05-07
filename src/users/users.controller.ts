import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll(@Query() query: { since: string }) {
    return this.usersService.findAll(query.since);
  }

  @Get(':username/details')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
