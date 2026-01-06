import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { parse } from 'pg-connection-string';

// 解析DATABASE_URL环境变量
const connectionString = process.env.DATABASE_URL || '';
const parsed = parse(connectionString);

// 使用解析后的参数配置Pool，确保SSL选项正确设置并处理null值
const pool = new Pool({
  host: parsed.host || undefined,
  user: parsed.user || undefined,
  password: parsed.password || undefined,
  database: parsed.database || undefined,
  port: parsed.port ? parseInt(parsed.port) : 5432,
  ssl: parsed.ssl ? { rejectUnauthorized: false } : false,
});

// 创建PrismaPg适配器
const adapter = new PrismaPg(pool);

// 使用适配器初始化PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
    adapter,
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
