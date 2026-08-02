import React from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Career Guides & Industry Insights
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Rozgar Pakistan Career Blog</h1>
        <p className="text-xs text-slate-500 mt-0.5">Expert advice on navigating tech salaries, interview preparation, and ATS CV formatting in Pakistan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(post => (
          <div key={post.id} className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between">
            <div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span>{post.category}</span>
                  <span className="text-slate-400 font-normal">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>By {post.author} • {post.date}</span>
              <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
