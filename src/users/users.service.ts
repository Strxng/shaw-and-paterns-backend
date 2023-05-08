import { Injectable } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http-custom.service';
import { IUser } from './interfaces/user.interface';
import { IUserFindAll } from './interfaces/user-findall.interface';
import { IUserDetails } from './interfaces/user-details.interface';
import { IUserRepos } from './interfaces/user-repos.interface';

@Injectable()
export class UsersService {
  constructor(private readonly httpCustomService: HttpCustomService) {}

  private readonly itensPerPage = 10;

  async findAll(since?: string): Promise<IUserFindAll> {
    const { data } = await this.httpCustomService.get<IUser[]>(
      process.env.GITHUB_USERS_ENDPOINT,
      {
        headers: {
          Authorization: process.env.GITHUB_ACCESS_TOKEN,
        },
        params: {
          per_page: this.itensPerPage,
          since: since ? since : 0,
        },
      },
    );

    const url = process.env.CURRENT_PROJECT_URL;

    const nextPage = `${url}?since=${(+since || 0) + this.itensPerPage}`;
    const prevPage =
      (+since || 0) - this.itensPerPage < 0
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

  async findOne(username: string) {
    const { data } = await this.httpCustomService.get<IUserDetails[]>(
      `${process.env.GITHUB_USERS_ENDPOINT}/${username}`,
      {
        headers: {
          Authorization: process.env.GITHUB_ACCESS_TOKEN,
        },
      },
    );

    return data;
  }

  async findAllReposByUser(username: string) {
    const { data } = await this.httpCustomService.get<IUserRepos[]>(
      `${process.env.GITHUB_USERS_ENDPOINT}/${username}/repos`,
      {
        headers: {
          Authorization: process.env.GITHUB_ACCESS_TOKEN,
        },
      },
    );

    return data;
  }
}
