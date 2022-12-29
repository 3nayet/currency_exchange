import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private http: HttpService) {}

  getRates() {
    this.logger.log('retrieving currency rates from currncy api');
    const headersRequest = {
        'X-RapidAPI-Host': 'currencyapi-net.p.rapidapi.com',
        'X-RapidAPI-Key': '2cacdc3369msh2736bfcdfbc073ep198647jsndfd413d8aaf7',
    };
    const price = this.http
      .get( 'https://currencyapi-net.p.rapidapi.com/rates', { headers: headersRequest }).pipe(
        map(response =>  response.data)
      );

      this.logger.log(price);


    return price;
  }
}