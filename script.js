document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your Public Key
  emailjs.init("BQexvi0TQXFdJyQld");

  // 1. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;

  if (themeToggleBtn) {
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
  }

  // 2. Navbar Smooth Scroll & Active State Tracker on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
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
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
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
        if (
          filterValue === "all" ||
          (categories && categories.includes(filterValue))
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 4. Contact Form Handling (Live Email Delivery via EmailJS)
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (contactForm.checkValidity()) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn.innerHTML;

        // Auto-inject current timestamp for the {{time}} template variable
        let timeInput = contactForm.querySelector('input[name="time"]');
        if (!timeInput) {
          timeInput = document.createElement("input");
          timeInput.type = "hidden";
          timeInput.name = "time";
          contactForm.appendChild(timeInput);
        }
        timeInput.value = new Date().toLocaleString();

        // Show loading state on button
        submitBtn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        console.log("Attempting to send email via EmailJS...");

        // Using your exact Service ID ("service_ashe_123") and Template ID ("template_vahcwzh")
        emailjs
          .sendForm("service_Ashe_123", "template_vahcwzh", contactForm)
          .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            if (formAlert) {
              formAlert.classList.remove("d-none");
              formAlert.innerHTML =
                '<i class="fa-solid fa-circle-check me-2"></i>Thank you! Your message has been sent successfully.';
            }
            contactForm.reset();
            contactForm.classList.remove("was-validated");

            setTimeout(() => {
              if (formAlert) formAlert.classList.add("d-none");
            }, 5000);
          })
          .catch((error) => {
            console.error("FAILED... Email error details:", error);
            alert(
              "Failed to send message: " +
                (error.text || JSON.stringify(error)) +
                "\nPlease check browser Console (F12) for detailed error information.",
            );
          })
          .finally(() => {
            // Restore button state
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
          });
      } else {
        contactForm.classList.add("was-validated");
      }
    });
  }

  // 5. Resume Buttons Action
  const downloadResumeBtn = document.getElementById("downloadResumeBtn");
  const viewResumeBtn = document.getElementById("viewResumeBtn");
  const resumeModalElement = document.getElementById("resumeModal");

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener("click", () => {
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
  }

  if (viewResumeBtn && resumeModalElement) {
    const resumeModal = new bootstrap.Modal(resumeModalElement);
    viewResumeBtn.addEventListener("click", () => {
      resumeModal.show();
    });
  }
});
