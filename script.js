document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.setAttribute("data-bs-theme", newTheme);

    if (newTheme === "light") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });

  // 2. Navbar Smooth Scroll & Active State Tracker on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Auto Close Mobile Nav On Click
  const navbarCollapse = document.getElementById("navbarNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // 3. Filterable Projects Logic
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectItems.forEach((item) => {
        const categories = item.getAttribute("data-category");
        if (filterValue === "all" || categories.includes(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 4. Contact Form Handling (Simulation without page refresh)
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (contactForm.checkValidity()) {
      formAlert.classList.remove("d-none");
      contactForm.reset();

      setTimeout(() => {
        formAlert.classList.add("d-none");
      }, 5000);
    } else {
      contactForm.classList.add("was-validated");
    }
  });

  // 5. Resume Buttons Action
  const downloadResumeBtn = document.getElementById("downloadResumeBtn");
  const viewResumeBtn = document.getElementById("viewResumeBtn");
  const resumeModal = new bootstrap.Modal(
    document.getElementById("resumeModal"),
  );

  downloadResumeBtn.addEventListener("click", () => {
    // Clipboard copy fallback or download simulation
    const tempBtn = downloadResumeBtn;
    tempBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin me-2"></i>Downloading...';
    setTimeout(() => {
      tempBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Downloaded!';
      setTimeout(() => {
        tempBtn.innerHTML =
          '<i class="fa-solid fa-download me-2"></i>Download Resume (PDF)';
      }, 2000);
    }, 1000);
  });

  viewResumeBtn.addEventListener("click", () => {
    resumeModal.show();
  });
});
