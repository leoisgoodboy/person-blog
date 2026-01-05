'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CategoriesFilter from '../../components/CategoriesFilter';
import { Post } from '../../types/post';

export default function CategoriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories data');
        }
        const data = await response.json();
        setPosts(data.posts);
        setCategories(data.categories);
      } catch (err) {
        setError('获取分类数据失败，请重试');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoriesData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <CategoriesFilter posts={posts} allCategories={categories} />
          )}
        </div>
      </main>
    </div>
  );
}
