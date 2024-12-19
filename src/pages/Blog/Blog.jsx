import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFont } from '../../context/FontContext';
import { Link } from 'react-router-dom';
import allBlogPosts from '../../data/blogposts';

const Blog = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { fontStyle } = useFont();

  // Use the same font as headers based on fontStyle
  const headerFont = fontStyle === 'EasyRead' ? 'TrashHand' : 'main';

  return (
    <div className="min-h-screen bg-background-color pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="font-main text-4xl md:text-5xl mb-8 tracking-wider text-gradient text-center homecard-container"
            style={{ fontFamily: headerFont }}
          >
            Blog
          </h1>

          {/* Featured Posts Section */}
          <div className="mb-12">
            <h2 
              className="font-header text-3xl mb-6 tracking-wide"
              style={{ fontFamily: headerFont }}
            >
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allBlogPosts
                .filter(post => post.featured)
                .map((post, index) => {
                  const postData = post.getPreviewData();
                  return (
                    <FeaturedPostCard 
                      key={postData.id} 
                      post={postData} 
                      index={index}
                      headerFont={headerFont}
                      isHovered={hoveredId === postData.id}
                      onHover={setHoveredId}
                    />
                  );
                })}
            </div>
          </div>

          {/* All Posts Grid */}
          <div>
            <h2 
              className="font-header text-3xl mb-6 tracking-wide"
              style={{ fontFamily: headerFont }}
            >
              All Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBlogPosts.map((post, index) => {
                const postData = post.getPreviewData();
                return (
                  <BlogPostCard 
                    key={postData.id} 
                    post={postData} 
                    index={index}
                    headerFont={headerFont}
                    isHovered={hoveredId === postData.id}
                    onHover={setHoveredId}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeaturedPostCard = ({ post, index, headerFont, isHovered, onHover }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="relative rounded-xl overflow-hidden shadow-lg bg-black/30 hover:bg-black/40 transition-all duration-300"
    onMouseEnter={() => onHover(post.id)}
    onMouseLeave={() => onHover(null)}
  >
    <Link to={`/blog/${post.id}`} className="block h-full">
      <div className="aspect-video relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-borela text-primary-color text-sm">{post.category}</span>
          <span className="text-gray-400">•</span>
          <span className="font-borela text-gray-400 text-sm">{post.readTime}</span>
        </div>
        <h3 
          className="font-header text-2xl mb-3 tracking-wide"
          style={{ fontFamily: headerFont }}
        >
          {post.title}
        </h3>
        <p className="font-borela text-gray-300 mb-4">{post.summary}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 rounded-full bg-primary-color/20 text-primary-color text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400 font-borela">
          {post.publishDate}
        </div>
      </div>
    </Link>
  </motion.div>
);

const BlogPostCard = ({ post, index, headerFont, isHovered, onHover }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="relative rounded-xl overflow-hidden shadow-lg bg-black/30 hover:bg-black/40 transition-all duration-300"
    onMouseEnter={() => onHover(post.id)}
    onMouseLeave={() => onHover(null)}
  >
    <Link to={`/blog/${post.id}`} className="block">
      <div className="aspect-video relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary-color text-sm">{post.category}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400 text-sm">{post.readTime}</span>
        </div>
        <h3 
          className="font-header text-xl mb-2 tracking-wide"
          style={{ fontFamily: headerFont }}
        >
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.summary}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded-full bg-primary-color/20 text-primary-color text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-400">
          {post.publishDate}
        </div>
      </div>
    </Link>
  </motion.div>
);

export default Blog;
