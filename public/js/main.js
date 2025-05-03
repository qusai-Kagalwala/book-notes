// Simple client-side JavaScript for the Book Notes App

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle book cover image errors
  const bookCovers = document.querySelectorAll('.book-cover img');
  
  bookCovers.forEach(cover => {
    cover.addEventListener('error', () => {
      // Replace with placeholder when image fails to load
      const parent = cover.parentElement;
      parent.innerHTML = '<div class="no-cover">No Cover Available</div>';
    });
  });
  
  // Add confirmation for delete buttons
  const deleteForms = document.querySelectorAll('.delete-form');
  
  deleteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const confirmed = confirm('Are you sure you want to delete this book?');
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });
});