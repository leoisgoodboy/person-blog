import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// 直接使用连接参数配置Pool，确保SSL选项正确设置
const pool = new Pool({
  host: 'db.nswxafyljltfykutpgqw.supabase.co',
  user: 'postgres',
  password: 'FAquLMGU8TNYAk3Q',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // 关键：绕过自签名证书验证
  },
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
