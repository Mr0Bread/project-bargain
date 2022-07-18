import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from 'prisma-client';
import { DatabaseService } from "@modules/database/database.service";

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.databaseService.customer.create({
      data,
    });
  }

  async findUnique(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.databaseService.customer.findUnique({
      where,
    });
  }
}
