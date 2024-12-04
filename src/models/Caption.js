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
    this.date = date; // Expecting 'YYYY-MM-DD'
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

  // Helper method to format date as Pacific Time
  getFormattedDate() {
    if (!this.date) return '';

    // Treat the date as Pacific Time (America/Los_Angeles)
    const [year, month, day] = this.date.split('-');
    const pacificDate = new Date(
      Date.UTC(year, month - 1, day, 0, 0, 0) // Start at midnight UTC
    );

    return pacificDate.toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles',
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