import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll(@Query() query: { since: string }, @Req() req: any) {
    const urlBase = `https://${req.get('Host')}/api/users`;

    return this.usersService.findAll(urlBase, query.since);
  }

  @Get(':username/details')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Get(':username/repos')
  findAllReposByUser(@Param('username') username: string) {
    return this.usersService.findAllReposByUser(username);
  }
}
