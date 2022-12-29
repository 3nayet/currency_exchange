import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatesModule } from './rates/rates.module';
import { TasksModule } from './task/task.module';

@Module({
  imports: [RatesModule,MongooseModule.forRoot('mongodb://mongo:27017/currency'),TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
