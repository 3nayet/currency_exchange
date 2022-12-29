import { Injectable } from "@nestjs/common";

import { Rate } from "./schemas/rate.schema";
import { RatesRepository } from "./rates.repository";

@Injectable()
export class RatesService {
    constructor(private readonly ratesRepository: RatesRepository) {}

    async getRateByBase(base: string, liveRate: boolean): Promise<Rate> {
        return this.ratesRepository.findOne({ base, liveRate })
    }

    async getRatesDateFiltered(from: number, to:number): Promise<Rate[]> {
        return this.ratesRepository.findDateRange({from: from? from: Number.MIN_VALUE, to: to?to : Number.MAX_VALUE});
    }

    async getRates(): Promise<Rate[]> {
        return this.ratesRepository.find({});
    }

    async crateRate(rate: Rate): Promise<Rate> {
        return this.ratesRepository.create(rate);
    }
}