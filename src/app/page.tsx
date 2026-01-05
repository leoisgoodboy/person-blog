import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import prisma from '../lib/prisma';

// Define the posts per page
const POSTS_PER_PAGE = 3;

// Server component for fetching posts
export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  // 使用await解包searchParams Promise
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const skip = (page - 1) * POSTS_PER_PAGE;

  // Fetch posts from database with pagination
  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: POSTS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count()
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">最新文章</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="inline-flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <a
                    key={number}
                    href={`?page=${number}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${page === number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                    {number}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
