import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, User } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  public getAll(): Promise<Book[]> {
    return this.prismaService.book.findMany({
      include: { author: true },
    });
  }

  public getById(id: Book['id']): Promise<Book> | null {
    return this.prismaService.book.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  public deleteById(id: Book['id']): Promise<Book> {
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  public async create(
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    const { authorId, ...otherData } = bookData;
    try {
      return await this.prismaService.book.create({
        data: {
          ...otherData,
          author: {
            connect: { id: authorId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('Author doesnt exist');
      if (error.code === 'P2002')
        throw new ConflictException(' Title is already taken ');
      throw error;
    }
  }

  public async updatedById(
    id: Book['id'],
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    const { authorId, ...otherData } = bookData;
    try {
      return await this.prismaService.book.update({
        where: { id },
        data: {
          ...otherData,
          author: {
            connect: { id: authorId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('Author doesnt exist');
      if (error.code === 'P2002')
        throw new ConflictException('Title is already taken');
      throw error;
    }
  }

  public async like(bookId: Book['id'], userId: User['id']): Promise<Book> {
    try {
      return await this.prismaService.book.update({
        where: { id: bookId },
        data: {
          users: {
            create: {
              user: {
                connect: { id: userId },
              },
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('This book does not exists');
      if (error.code === 'P2002')
        throw new ConflictException('This book is already liked by you');
      throw error;
    }
  }
}
