class Project {
  constructor({
    id,
    title,
    description,
    shortDescription,
    technologies,
    prevText,
    githubUrl,
    liveUrl,
    category,
    featured = false,
    completionDate
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.shortDescription = shortDescription;
    this.technologies = technologies;
    this.prevText = prevText;
    this.githubUrl = this.validateUrl(githubUrl);
    this.liveUrl = liveUrl;
    this.category = category;
    this.featured = featured;
    this.completionDate = completionDate;

    // Log the created project for debugging
    console.log('Created project with URL:', this.githubUrl);
  }

  validateUrl(url) {
    if (!url) return null;
    try {
      new URL(url);
      return url;
    } catch (e) {
      console.error('Invalid URL provided:', url);
      return null;
    }
  }

  // Method to create a featured project
  static createFeatured(projectData) {
    return new Project({ ...projectData, featured: true });
  }

  // Method to get project preview data
  getPreviewData() {
    return {
      id: this.id,
      title: this.title,
      shortDescription: this.shortDescription,
      prevText: this.prevText,
      technologies: this.technologies,
      category: this.category,
      featured: this.featured,
      githubUrl: this.githubUrl
    };
  }

  // Method to get full project data
  getFullData() {
    return {
      ...this,
      formattedDate: this.getFormattedDate()
    };
  }

  // Helper method to format completion date
  getFormattedDate() {
    if (!this.completionDate) return 'Ongoing';
    return new Date(this.completionDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }

  // Method to update project data
  update(newData) {
    Object.assign(this, newData);
    if (newData.githubUrl) {
      this.githubUrl = this.validateUrl(newData.githubUrl);
    }
    return this;
  }

  // Method to check if project matches search criteria
  matchesSearch(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    return (
      this.title.toLowerCase().includes(searchLower) ||
      this.description.toLowerCase().includes(searchLower) ||
      this.technologies.some(tech => tech.toLowerCase().includes(searchLower))
    );
  }

  // Method to validate project data
  validate() {
    const requiredFields = ['id', 'title', 'description', 'technologies'];
    const missingFields = requiredFields.filter(field => !this[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (this.technologies.length === 0) {
      throw new Error('Project must have at least one technology');
    }

    return true;
  }
}

export default Project;
