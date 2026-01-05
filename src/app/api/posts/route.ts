import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const body = await req.json();
    const { title, summary, content, category, tags } = body;

    // 验证必填字段
    if (!title || !summary || !content || !category) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    // 创建新文章  
    // const newPost = await prisma.comment.create({})
    const newPost = await prisma.post.create({
      data: {
        title,
        summary,
        content,
        category,
        tags: Array.isArray(tags) ? tags : [],
      },
    });
    // 返回创建成功的文章数据
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    // 捕获并记录错误
    console.error('Error creating post:', error);
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
  }
}


// - 定义 POST 函数处理文章创建请求
// - 解析请求体获取文章数据
// - 验证必填字段（标题、摘要、内容、分类）
// - 使用 Prisma ORM 创建文章记录，确保 tags 是数组类型
// - 返回创建成功的文章数据或错误信息