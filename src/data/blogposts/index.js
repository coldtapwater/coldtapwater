import frgmtAi from './frgmtAi';
import prismBlogPost from './prism';
import frm from './frm';
// import webPerformance from './webPerformance';

// Add all blog posts to this array
// The order here determines the display order in the blog list
const allBlogPosts = [
  frgmtAi,
  prismBlogPost,
  frm
  // webPerformance,
  // Add new blog posts here
];

// Validate all blog posts
allBlogPosts.forEach(post => {
  try {
    post.validate();
  } catch (error) {
    console.error(`Validation error in blog post ${post.id}:`, error.message);
  }
});

export default allBlogPosts;
