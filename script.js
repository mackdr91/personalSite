document.addEventListener("DOMContentLoaded", () => {
  const aboutLink = document.querySelector('a[href="#about"]');
  const contactLink = document.querySelector('a[href="#contact"]');
  const projectsLink = document.querySelector('a[href="#projects"]');
  const aboutSection = document.querySelector(".about-section");
  const contactSection = document.querySelector(".contact-section");
  const projectsSection = document.querySelector(".projects-section");
  const container = document.querySelector(".container");

  // Function to close all sections
  const closeAllSections = () => {
    aboutSection.classList.remove("active");
    contactSection.classList.remove("active");
    projectsSection.classList.remove("active");
  };

  const animateSection = (section) => {
    section.style.opacity = "0";
    section.classList.add("active");

    requestAnimationFrame(() => {
      section.style.transition =
        "opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      section.style.opacity = "1";
    });
  };

  // Toggle projects section
  projectsLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeAllSections();
    projectsSection.classList.toggle("active");
  });

  // Toggle about section
  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeAllSections();
    aboutSection.classList.toggle("active");
  });

  // Toggle contact section
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeAllSections();
    contactSection.classList.toggle("active");
  });

  // Close sections when clicking outside
  container.addEventListener("click", (e) => {
    if (
      !aboutSection.contains(e.target) &&
      !contactSection.contains(e.target) &&
      !projectsSection.contains(e.target) &&
      !aboutLink.contains(e.target) &&
      !contactLink.contains(e.target) &&
      !projectsLink.contains(e.target)
    ) {
      closeAllSections();
    }
  });

  // Add keyboard navigation (ESC to close)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllSections();
    }
  });

  // Smooth scroll for mobile
  const smoothScroll = (e) => {
    if (window.innerWidth <= 768) {
      const yOffset = -60; // Adjust based on your header height
      const element = document.querySelector(e.target.getAttribute("href"));
      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  aboutLink.addEventListener("click", smoothScroll);
  contactLink.addEventListener("click", smoothScroll);
  projectsLink.addEventListener("click", smoothScroll);

  // Handle touch events for mobile (swipe down to close)
  let touchStartY = 0;
  let touchEndY = 0;

  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchEndY - touchStartY > 50) {
      // Swipe down
      closeAllSections();
    }
    touchStartY = 0;
    touchEndY = 0;
  };

  [aboutSection, contactSection, projectsSection].forEach((section) => {
    section.addEventListener("touchstart", handleTouchStart);
    section.addEventListener("touchmove", handleTouchMove);
    section.addEventListener("touchend", handleTouchEnd);
  });
});
