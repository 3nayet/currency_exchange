import { Injectable, Logger } from '@nestjs/common';
import { Interval} from '@nestjs/schedule';
import { ClientService } from 'src/client/client.service';
import { RatesService } from 'src/rates/rates.service';
import { lastValueFrom } from 'rxjs';
import { Rate } from 'src/rates/schemas/rate.schema';
import { WebSocketGateway } from "@nestjs/websockets";
import { WebSocketServer } from '@nestjs/websockets/decorators';

@Injectable()
@WebSocketGateway(+process.env.WEBSOCKET_PORT, { cors:'*'})
export class TasksService {
  constructor(private client: ClientService, private rates: RatesService) {}
  private readonly logger = new Logger(TasksService.name);

  @WebSocketServer()
  server;

  @Interval(+process.env.CURR_RATE_INTERVAL_MILLS)
  async updateRates() {
    const data = this.client.getRates();
    const rate: Rate = await lastValueFrom(data);
    rate.liveRate = true;
    this.rates.crateRate(rate);
    this.server.emit('rateMessage', rate);
    }

}