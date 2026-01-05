'use client';
import { useState } from 'react';
import PostCard from './PostCard';

interface CategoriesFilterProps {
  posts: any[];
  allCategories: string[];
}

export default function CategoriesFilter({ posts, allCategories }: CategoriesFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);


  // State setter 函数 更新变量并触发 React 再次渲染组件
  // setSelectedCategory 是 useState 钩子返回的第二个元素，用于更新 selectedCategory 状态
  // 当调用 setSelectedCategory 并传入新值时，React 会重新渲染组件并使用新值更新 UI

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-10">文章分类</h1>

      
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {category === 'all' ? '全部' : category}
          </button>
        ))}
      </div>

      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">该分类下暂无文章</p>
        </div>
      )}
    </>
  );
}