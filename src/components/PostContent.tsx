'use client';
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { Post } from '../types/post';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings from markdown content
  useEffect(() => {
    const extractedHeadings: { id: string; text: string; level: number }[] = [];
    const lines = post.content.split('\n');
    
    lines.forEach(line => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    });
    
    setHeadings(extractedHeadings);
    if (extractedHeadings.length > 0) {
      setActiveHeading(extractedHeadings[0].id);
    }
  }, [post.content]);

  // Handle scroll to update active heading
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = window.scrollY + 100;
      
      // Find the current active heading
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Custom renderer for headings to add ids
  const customRenderers = {
    heading: ({ children, level }: { children: React.ReactNode; level: number }) => {
      // Convert children to array and extract text content safely
      const childrenArray = React.Children.toArray(children);
      const text = childrenArray
        .map(child => {
          if (typeof child === 'string') return child;
          if (typeof child === 'number') return child.toString();
          return '';
        })
        .join('');
      
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      return React.createElement(
        `h${level}`,
        { id, className: `text-${4 - level}xl font-bold text-gray-800 mt-8 mb-4` },
        children
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar - Table of Contents */}
      <aside className="lg:w-64 lg:sticky lg:top-24 self-start">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">目录</h3>
          {headings.length > 0 ? (
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-sm transition-colors ${activeHeading === heading.id
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-500'}
                    ${'pl-' + (heading.level - 1) * 4}`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          ) : (
            <p className="text-gray-500 text-sm">暂无目录</p>
          )}
        </div>
      </aside>

      {/* Right Content */}
      <article className="flex-1">
        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="mr-6">{post.category}</span>
            <span>发布于: {new Date(post.createdAt).toLocaleDateString()}</span>
            {new Date(post.updatedAt).toLocaleDateString() !== new Date(post.createdAt).toLocaleDateString() && (
              <span className="ml-6">更新于: {new Date(post.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
          <div className="text-gray-700 mb-4">
            <p className="text-lg italic">{post.summary}</p>
          </div>0
        </div>

        {/* Post Content */}
        <div 
          ref={contentRef}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="prose max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={customRenderers as any}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
