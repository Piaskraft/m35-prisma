import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    try {
      return await this.prisma.order.create({ data: dto });
    } catch (e: any) {
      // FK: Order.productId -> Product.id
      if (e?.code === 'P2003' && String(e?.meta?.field_name || '').includes('productId')) {
        throw new BadRequestException('productId nie istnieje');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
