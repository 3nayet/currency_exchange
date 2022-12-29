import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
    @Prop({default: true})
    valid: boolean;

    @Prop()
    updated: number;

    @Prop()
    base: string;

    @Prop()
    baseAmount: number;

    @Prop({
        type: Map
     })
    rates: Map<string, number>;

    @Prop({default: false} )
    liveRate: boolean;

}

export const RateSchema = SchemaFactory.createForClass(Rate);
