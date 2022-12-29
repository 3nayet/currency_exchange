import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Rate, RateDocument } from "./schemas/rate.schema";

@Injectable()
export class RatesRepository {
    constructor(@InjectModel(Rate.name) private rateModel: Model<RateDocument>) {}

    async findOne(rateFilterQuery: FilterQuery<Rate>): Promise<Rate> {
        return this.rateModel.findOne(rateFilterQuery, {}, { sort: { 'updated' : -1 } });
    }

    async find(rateFilterQuery: FilterQuery<Rate>): Promise<Rate[]> {
        return this.rateModel.find(rateFilterQuery)
    }

    async findDateRange(rateFilterQuery: FilterQuery<Rate>): Promise<Rate[]> {
        return this.rateModel.find({ updated: { $gte: rateFilterQuery.from, $lt: rateFilterQuery.to }});
        
    }

    async create(rate: Rate): Promise<Rate> {
        const newRate = new this.rateModel(rate);
        return newRate.save()
    }

    async findOneAndUpdate(rateFilterQuery: FilterQuery<Rate>, rate: Partial<Rate>): Promise<Rate> {
        return this.rateModel.findOneAndUpdate(rateFilterQuery, rate, { new: true, upsert: true});
    }
}