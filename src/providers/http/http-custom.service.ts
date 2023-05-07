import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

interface HttpCustomResponse<T> {
  data: T;
  headers: any;
}

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<HttpCustomResponse<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, config),
      );
      return { data: response.data, headers: response.headers };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
