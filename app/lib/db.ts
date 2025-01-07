import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// For backward compatibility with existing code
export const query = async (text: string, params?: any[]) => {
  console.warn('Warning: Using deprecated query function. Please migrate to Prisma client.');
  return prisma.$queryRaw`${text}`
}

export default prisma 