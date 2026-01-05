import { Post } from '../types/post';

export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js 14 新特性详解',
    summary: '本文详细介绍了 Next.js 14 的主要新特性，包括 App Router 改进、React 18 支持、性能优化等。',
    content: `# Next.js 14 新特性详解

## 1. App Router 改进

Next.js 14 对 App Router 进行了重大改进，包括：

- 更好的嵌套路由支持
- 更灵活的布局系统
- 改进的数据流管理

\`\`\`jsx
// 示例代码
import { Layout } from './Layout';

export default function Page() {
  return (
    <Layout>
      <h1>Hello Next.js 14</h1>
    </Layout>
  );
}
\`\`\`

## 2. React 18 支持

完全支持 React 18 的新特性：

- 并发渲染
- Suspense 改进
- 自动批处理

## 3. 性能优化

- 更小的打包体积
- 更快的冷启动时间
- 改进的缓存策略

## 4. 开发体验提升

- 更快的热重载
- 更好的错误信息
- 改进的 TypeScript 支持`,
    tags: ['Next.js', 'React', '前端开发'],
    category: '技术博客',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'React Server Components 实战指南',
    summary: '深入探讨 React Server Components 的使用场景和最佳实践，通过实际案例展示其优势。',
    content: `# React Server Components 实战指南

## 什么是 React Server Components

React Server Components (RSC) 允许开发者在服务器端渲染组件，从而减少客户端的 JavaScript 体积，提高性能。

## 核心优势

- 减少客户端 JS 体积
- 直接访问服务器资源
- 更好的 SEO 支持
- 更快的首屏加载

\`\`\`jsx
// 服务器组件示例
import { db } from './db';

export default async function ServerComponent() {
  const data = await db.query('SELECT * FROM posts');
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## 最佳实践

1. 将数据密集型组件设为服务器组件
2. 客户端组件专注于交互
3. 合理使用 Suspense 进行加载状态管理
4. 注意服务器组件和客户端组件的边界`,
    tags: ['React', 'RSC', '服务器渲染'],
    category: '技术博客',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'TypeScript 5.0 新特性解析',
    summary: '详细介绍 TypeScript 5.0 的主要新特性，包括装饰器、const 类型参数、枚举增强等。',
    content: `# TypeScript 5.0 新特性解析

## 1. 装饰器

TypeScript 5.0 正式支持 ECMAScript 装饰器：

\`\`\`typescript
// 类装饰器示例
function logged(constructor: Function) {
  console.log('Class decorated');
}

@logged
class Example {
  // 成员装饰器示例
  @enumerable(false)
  method() {
    // 方法实现
  }
}
\`\`\`

## 2. const 类型参数

允许在泛型中使用 const 修饰符：

\`\`\`typescript
function createArray<T extends readonly any[]>(
  ...args: T
): T {
  return args;
}

// 类型为 [1, 2, 3] 而不是 number[]
const arr = createArray(1, 2, 3);
\`\`\`

## 3. 枚举增强

- 联合枚举
- 更严格的枚举类型检查
- 改进的枚举编译输出

## 4. 性能优化

- 更快的编译速度
- 更小的声明文件
- 改进的内存使用`,
    tags: ['TypeScript', '前端开发', '类型系统'],
    category: '技术博客',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    title: 'Tailwind CSS 3.4 新特性',
    summary: '探索 Tailwind CSS 3.4 的新功能，包括动态颜色、改进的工具类和性能优化。',
    content: `# Tailwind CSS 3.4 新特性

## 1. 动态颜色

Tailwind CSS 3.4 引入了动态颜色支持：

\`\`\`html
<div class="bg-[hsl(var(--primary))]">
  <h1 class="text-[hsl(var(--primary)/0.8)]">Hello Tailwind</h1>
</div>
\`\`\`

## 2. 改进的工具类

- 新增了更多的排版工具类
- 改进的响应式设计支持
- 更好的动画工具类

## 3. 性能优化

- 更快的构建速度
- 更小的 CSS 体积
- 改进的 JIT 编译

## 4. 开发体验提升

- 更好的 IDE 支持
- 改进的文档
- 新增了官方插件`,
    tags: ['Tailwind CSS', 'CSS', '前端开发'],
    category: '技术博客',
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  },
  {
    id: '5',
    title: '现代前端架构设计原则',
    summary: '探讨现代前端架构的设计原则和最佳实践，包括组件化、状态管理、性能优化等。',
    content: `# 现代前端架构设计原则

## 1. 组件化设计

- 单一职责原则
- 可复用性
- 可测试性
- 松耦合

## 2. 状态管理

- 集中式状态管理 vs 分散式状态管理
- 状态提升
- 上下文 API
- 状态管理库选择

## 3. 性能优化

- 代码分割
- 懒加载
- 缓存策略
- 虚拟滚动

## 4. 可访问性

- 语义化 HTML
- ARIA 支持
- 键盘导航
- 颜色对比度

## 5. 测试策略

- 单元测试
- 集成测试
- E2E 测试
- 快照测试`,
    tags: ['前端架构', '设计原则', '最佳实践'],
    category: '技术博客',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: '6',
    title: 'Vercel 部署最佳实践',
    summary: '介绍如何在 Vercel 上高效部署 Next.js 应用，包括配置、优化和监控。',
    content: `# Vercel 部署最佳实践

## 1. 项目配置

- 合理配置 vercel.json
- 环境变量管理
- 构建命令优化

\`\`\`json
// vercel.json 示例
{
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
\`\`\`

## 2. 性能优化

- 启用边缘函数
- 合理使用 CDN
- 缓存静态资源
- 优化图片加载

## 3. 监控和日志

- 集成 Vercel Analytics
- 设置错误监控
- 日志管理

## 4. 团队协作

- 分支预览
- 部署审批流程
- 环境隔离`,
    tags: ['Vercel', '部署', 'DevOps'],
    category: '技术博客',
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10')
  }
];
