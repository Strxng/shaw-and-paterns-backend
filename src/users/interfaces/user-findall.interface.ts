import { IUser } from './user.interface';

export interface IUserFindAll {
  users: IUser[];
  pagination: {
    nextPage: string;
    prevPage: string;
  };
}
