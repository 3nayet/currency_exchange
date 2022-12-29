import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Rate, RateSchema } from "./schemas/rate.schema";
import { RatesController } from "./rates.controller";
import { RatesRepository } from "./rates.repository";
import { RatesService } from "./rates.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }])],
    controllers: [RatesController],
    providers: [RatesService, RatesRepository],
    exports: [RatesService]
})
export class RatesModule {}