const projects = [
  {
    name: "Personal Portfolio",
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio-url.com",
    description:
      "A modern portfolio website built with React and Three.js, featuring interactive 3D elements and smooth animations.",
    technologies: ["React", "Three.js", "CSS3", "JavaScript"],
    image: "portfolio-screenshot.jpg",
  },
  // Add your other projects here following the same structure
  {
    name: "Bussin Food API",
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio-url.com",
    description:
      "A food API that allows users to save their recipes for later.  ",
    technologies: ["Django", "Python", "PostgreSQL", "Docker", "Railway", "Tailwind CSS"],
    image: "portfolio-screenshot.jpg",
  },

];

// Function to create project cards
function createProjectCard(project) {
  return `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
            <div class="project-links">
                <a href="${
                  project.github
                }" target="_blank" rel="noopener noreferrer" class="project-link github">View Code</a>
                <a href="${
                  project.live
                }" target="_blank" rel="noopener noreferrer" class="project-link live">Live Demo</a>
            </div>
        </div>
    `;
}

// Function to render all projects
function renderProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map((project) => createProjectCard(project))
      .join("");
  }
}

// Initialize projects when the DOM is loaded
document.addEventListener("DOMContentLoaded", renderProjects);
