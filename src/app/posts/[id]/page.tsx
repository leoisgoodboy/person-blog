import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import PostContent from '../../../components/PostContent';
import prisma from '../../../lib/prisma';

export default async function PostDetail({ params }: { params: Promise<{id:string}> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ // 根据id查询单篇文章
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <PostContent post={post} />
        </div>
      </main>
    </div>
  );
}
