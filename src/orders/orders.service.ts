import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    // zakładamy FK: Order.productId -> Product.id (String/UUID)
    return this.prisma.order.create({ data: dto });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
