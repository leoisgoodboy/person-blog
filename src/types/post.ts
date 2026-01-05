export interface Post {
  id: string;           // 文章唯一标识符
  title: string;        // 文章标题
  summary: string;      // 文章摘要
  content: string;      // 文章内容
  tags: string[];       // 文章标签（字符串数组）
  category: string;     // 文章分类
  createdAt: Date;      // 创建时间（Date对象类型）
  updatedAt: Date;      // 更新时间（Date对象类型）
}