import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // 获取所有文章
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // 提取所有唯一分类
    const categories = Array.from(new Set(posts.map(post => post.category)));
    const allCategories = ['all', ...categories];

    // 返回数据
    return NextResponse.json({
      posts,
      categories: allCategories
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories data:', error);
    return NextResponse.json({ error: '获取分类数据失败' }, { status: 500 });
  }
}
