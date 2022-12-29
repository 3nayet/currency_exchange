import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Rate } from './schemas/rate.schema';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get(':base')
  async getLiveRatesforBase(@Param('base') base: string): Promise<Rate> {
    return this.ratesService.getRateByBase(base, true);
  }

  @Get()
  async getRatesDateFiltered(@Query() query): Promise<Rate[]> {
    return this.ratesService.getRatesDateFiltered(query.from, query.to);
  }

  @Get()
  async getRates(): Promise<Rate[]> {
      return this.ratesService.getRates();
  }

  @Post()
  async crateRate(@Body() rate: Rate): Promise<Rate> {
      return this.ratesService.crateRate(rate);
  }
}