import Link from 'next/link';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.summary}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.category}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
