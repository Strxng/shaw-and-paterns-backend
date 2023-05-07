import { Injectable } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http-custom.service';
import { IUser } from './interfaces/user.interface';
import { IUserFindAll } from './interfaces/user-findall.interface';

@Injectable()
export class UsersService {
  constructor(private readonly httpCustomService: HttpCustomService) {}

  private readonly itensPerPage = 10;

  async findAll(since: string): Promise<IUserFindAll> {
    const { data } = await this.httpCustomService.get<IUser[]>(
      'https://api.github.com/users',
      {
        headers: {
          Authorization: 'Bearer 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',
        },
        params: {
          per_page: this.itensPerPage,
          since: since,
        },
      },
    );

    const url = 'http://localhost:3000/api/users';

    const nextPage = `${url}?since=${+since + this.itensPerPage}`;
    const prevPage =
      +since - this.itensPerPage < 0
        ? `${url}?since=0`
        : `${url}?since=${+since - this.itensPerPage}`;

    return {
      users: data,
      pagination: {
        nextPage,
        prevPage,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
