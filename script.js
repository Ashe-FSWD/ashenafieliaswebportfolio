/* ==========================================================================
   Ashenafi Elias - Portfolio JavaScript & EmailJS Integration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle Management
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;

    themeIcon.classList.toggle("fa-moon", theme === "dark");
    themeIcon.classList.toggle("fa-sun", theme !== "dark");
  }

  // 2. Project Filtering Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        const categories = item.getAttribute("data-category");

        if (
          filterValue === "all" ||
          (categories && categories.includes(filterValue))
        ) {
          item.style.display = "block";

          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";

          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // 3. Resume Modal Quick View Handler
  const viewResumeBtn = document.getElementById("viewResumeBtn");

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
      const resumeModalElement = document.getElementById("resumeModal");

      if (resumeModalElement && window.bootstrap) {
        const resumeModal = new bootstrap.Modal(resumeModalElement);
        resumeModal.show();
      }
    });
  }

  // 4. EmailJS Contact Form Integration
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  if (contactForm) {
    const timeInput = contactForm.querySelector('input[name="time"]');

    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate the form
      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      // Check that the EmailJS SDK is loaded
      if (
        typeof emailjs === "undefined" ||
        typeof emailjs.sendForm !== "function"
      ) {
        showFormAlert(
          "danger",
          "Email service is unavailable. Please refresh the page and try again.",
        );

        console.error("EmailJS SDK is not loaded.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!submitBtn) {
        console.error("Contact form submit button was not found.");
        return;
      }

      const originalBtnText = submitBtn.innerHTML;

      // EmailJS configuration
      const SERVICE_ID = "service_Ashe_123";
      const TEMPLATE_ID = "template_vahcwzh";

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" ' +
        'role="status" aria-hidden="true"></span>Sending...';

      if (formAlert) {
        formAlert.classList.add("d-none");
      }

      try {
        // Send the actual form data through EmailJS
        const response = await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          contactForm,
        );

        console.log("EmailJS response:", response.status, response.text);

        // Show success ONLY after EmailJS confirms success
        showFormAlert(
          "success",
          "Thank you! Your message has been sent successfully.",
        );

        contactForm.reset();
        contactForm.classList.remove("was-validated");

        if (timeInput) {
          timeInput.value = new Date().toLocaleString();
        }

        // Hide the success message after 6 seconds
        setTimeout(() => {
          if (formAlert) {
            formAlert.classList.add("d-none");
          }
        }, 6000);
      } catch (error) {
        // Do not simulate success when the email fails
        console.error("EmailJS failed to send the email:", error);

        const errorMessage =
          error?.text ||
          error?.message ||
          "Unknown error. Check the browser console and EmailJS dashboard.";

        showFormAlert(
          "danger",
          "Your message was not sent. Please try again or email " +
            "ashenafieliascs@gmail.com directly.",
        );

        console.error("EmailJS error details:", errorMessage);
      } finally {
        // Always restore the submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // Display contact form feedback
  function showFormAlert(type, message) {
    if (!formAlert) {
      console.log(message);
      return;
    }

    formAlert.className = `alert alert-${type} mt-3 mb-0 rounded-3 shadow-sm`;

    formAlert.textContent = message;
    formAlert.classList.remove("d-none");
    formAlert.setAttribute("role", "alert");
  }

  // 5. Navbar Smooth Scroll Active Link Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 120) {
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
});
