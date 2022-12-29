import { Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientModule } from 'src/client/client.module';
import { RatesModule } from 'src/rates/rates.module';
import { TasksService } from './task.service';

@Module({
  imports: [ClientModule, ScheduleModule.forRoot(), RatesModule],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule implements OnModuleInit {
  constructor(private taskService: TasksService) {
  }

   onModuleInit() {
    this.taskService.updateRates();
  }
}


