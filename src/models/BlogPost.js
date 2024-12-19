import { getAuthor } from '../data/authors';

class BlogPost {
  constructor({
    id,
    title,
    content,
    summary,
    coverImage,
    tags = [],
    publishDate,
    lastModified,
    featured = false,
    readTime,
    category,
    authorId
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.summary = summary;
    this.coverImage = coverImage;
    this.tags = tags;
    this.publishDate = publishDate; // Expecting 'YYYY-MM-DD'
    this.lastModified = lastModified; // Optional, same format
    this.featured = featured;
    this.readTime = readTime || this.calculateReadTime();
    this.category = category;
    this.authorId = authorId;
    this.author = authorId ? getAuthor(authorId) : null;
  }

  // Get blog post preview data
  getPreviewData() {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      coverImage: this.coverImage,
      tags: this.tags,
      publishDate: this.getFormattedDate(this.publishDate),
      readTime: this.readTime,
      category: this.category,
      featured: this.featured,
      author: this.author ? {
        name: this.author.name,
        avatar: this.author.avatar
      } : null
    };
  }

  // Get full blog post data
  getFullData() {
    return {
      ...this,
      formattedPublishDate: this.getFormattedDate(this.publishDate),
      formattedLastModified: this.lastModified ? this.getFormattedDate(this.lastModified) : null
    };
  }

  // Helper method to format date as Pacific Time
  getFormattedDate(dateString) {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    const pacificDate = new Date(
      Date.UTC(year, month - 1, day, 0, 0, 0)
    );

    return pacificDate.toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Calculate estimated read time
  calculateReadTime() {
    if (!this.content) return '1 min read';
    const wordsPerMinute = 200;
    const wordCount = this.content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Method to create a featured blog post
  static createFeatured(postData) {
    return new BlogPost({ ...postData, featured: true });
  }

  // Method to check if blog post matches search criteria
  matchesSearch(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    return (
      this.title.toLowerCase().includes(searchLower) ||
      this.content.toLowerCase().includes(searchLower) ||
      this.summary.toLowerCase().includes(searchLower) ||
      (this.author && this.author.name.toLowerCase().includes(searchLower)) ||
      this.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Validate blog post data
  validate() {
    const requiredFields = ['id', 'title', 'content', 'summary', 'publishDate', 'authorId'];
    const missingFields = requiredFields.filter(field => !this[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (this.tags.length === 0) {
      throw new Error('Blog post must have at least one tag');
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.publishDate)) {
      throw new Error('Invalid publish date format. Use YYYY-MM-DD');
    }
    if (this.lastModified && !dateRegex.test(this.lastModified)) {
      throw new Error('Invalid last modified date format. Use YYYY-MM-DD');
    }

    // Author validation is handled by getAuthor function

    return true;
  }

  // Helper method to validate URLs
  validateUrl(url) {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default BlogPost;
