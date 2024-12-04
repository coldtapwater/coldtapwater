class Caption {
  constructor({
    id,
    title,
    description,
    imageUrl,
    category,
    date,
    location
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category; // 'art' or 'photo'
    this.date = date;
    this.location = location;
  }

  // Get caption preview data
  getPreviewData() {
    return {
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
      category: this.category
    };
  }

  // Get full caption data
  getFullData() {
    return {
      ...this,
      formattedDate: this.getFormattedDate()
    };
  }

  // Helper method to format date
  getFormattedDate() {
    if (!this.date) return '';
    return new Date(this.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Validate caption data
  validate() {
    const requiredFields = ['id', 'title', 'imageUrl', 'category'];
    const missingFields = requiredFields.filter(field => !this[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (!['art', 'photo'].includes(this.category)) {
      throw new Error('Category must be either "art" or "photo"');
    }

    return true;
  }
}

export default Caption;
