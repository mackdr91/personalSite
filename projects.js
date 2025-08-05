// GitHub API configuration
const GITHUB_USERNAME = 'mackdr91'; // Replace with your GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Fallback projects in case API fails
const fallbackProjects = [
  {
    name: "Personal Portfolio",
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio-url.com",
    description:
      "A modern portfolio website built with React and Three.js, featuring interactive 3D elements and smooth animations.",
    technologies: ["React", "Three.js", "CSS3", "JavaScript"],
    image: "portfolio-screenshot.jpg",
  },
  {
    name: "Bussin Food API",
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio-url.com",
    description:
      "A food API that allows users to save their recipes for later.",
    technologies: ["Django", "Python", "PostgreSQL", "Docker", "Railway", "Tailwind CSS"],
    image: "portfolio-screenshot.jpg",
  },
];

let projects = [];
let allProjects = [];
let currentPage = 1;
const projectsPerPage = 6;

// Function to fetch repositories from GitHub API
async function fetchGitHubRepos() {
  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const repos = await response.json();
    
    // Filter and transform repos
    return repos
      .filter(repo => !repo.fork && !repo.private) // Only public, non-fork repos
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by latest updated
      .map(repo => ({
        name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Format name
        github: repo.html_url,
        live: repo.homepage || repo.html_url,
        description: repo.description || "No description available.",
        technologies: repo.language ? [repo.language] : ["Unknown"],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: new Date(repo.updated_at).toLocaleDateString()
      }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return fallbackProjects;
  }
}

// Function to create project cards
function createProjectCard(project) {
  const statsHtml = project.stars !== undefined ? 
    `<div class="project-stats">
      <span class="stat">⭐ ${project.stars}</span>
      <span class="stat">🍴 ${project.forks}</span>
      <span class="stat">📅 ${project.updated}</span>
    </div>` : '';

  return `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
            ${statsHtml}
            <div class="project-links">
                <a href="${
                  project.github
                }" target="_blank" rel="noopener noreferrer" class="project-link github">View Code</a>
                ${project.live && project.live !== project.github ? 
                  `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link live">Live Demo</a>` : ''}
            </div>
        </div>
    `;
}

// Function to get paginated projects
function getPaginatedProjects(page = 1) {
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  return allProjects.slice(startIndex, endIndex);
}

// Function to create pagination controls
function createPaginationControls() {
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  
  if (totalPages <= 1) return '';
  
  let paginationHtml = '<div class="pagination">';
  
  // Previous button
  if (currentPage > 1) {
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage - 1}">&lt;</button>`;
  }
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? ' active' : '';
    paginationHtml += `<button class="pagination-btn${activeClass}" data-page="${i}">${i}</button>`;
  }
  
  // Next button
  if (currentPage < totalPages) {
    paginationHtml += `<button class="pagination-btn" data-page="${currentPage + 1}">&gt;</button>`;
  }
  
  paginationHtml += '</div>';
  return paginationHtml;
}

// Function to change page
function changePage(page) {
  currentPage = page;
  renderCurrentPage();
}

// Function to render current page
function renderCurrentPage() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid && allProjects.length > 0) {
    const currentProjects = getPaginatedProjects(currentPage);
    
    projectsGrid.innerHTML = currentProjects
      .map((project) => createProjectCard(project))
      .join("") + createPaginationControls();
    
    // Add event listeners to pagination buttons
    addPaginationEventListeners();
  }
}

// Function to add event listeners to pagination buttons
function addPaginationEventListeners() {
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  paginationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const page = parseInt(button.getAttribute('data-page'));
      if (page && page !== currentPage) {
        changePage(page);
      }
    });
  });
}

// Function to render all projects
async function renderProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    // Show loading state
    projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
    
    // Fetch projects from GitHub API
    allProjects = await fetchGitHubRepos();
    currentPage = 1; // Reset to first page
    
    // Render first page
    renderCurrentPage();
  }
}

// Function to show loading state
function showLoadingState() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = '<div class="loading">Loading repositories from GitHub...</div>';
  }
}

// Initialize projects when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  showLoadingState();
  renderProjects();
});
