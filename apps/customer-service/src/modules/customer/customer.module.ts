import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from "@modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
