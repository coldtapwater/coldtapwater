const authors = {
  'frgmt0': {
    name: 'frgmt0',
    avatar: '/images/avatar.jpg',
    bio: 'Code conjurer and certified AI wrangler. Building sleek tools, breaking even sleeker rules.',
    social: {
      github: 'https://github.com/frgmt0',
      bluesky: 'https://bsky.app/profile/frgmt.xyz',
      linkedin: 'https://linkedin.com/in/jacely'
    }
  }
  // Add more authors here as needed
};

export const getAuthor = (authorId) => {
  const author = authors[authorId];
  if (!author) {
    throw new Error(`Author with ID "${authorId}" not found`);
  }
  return author;
};

export default authors;
