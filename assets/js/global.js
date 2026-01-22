const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("translate-x-full");

  if (!mobileMenu.classList.contains("translate-x-full")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMobileMenu);

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  let isMoving = false;
  let inactivityTimer;

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.3;
    outlineY += (mouseY - outlineY) * 0.3;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    showCursor();

    inactivityTimer = setTimeout(() => {
      hideCursor();
    }, 3000);
  }

  function showCursor() {
    if (cursorDot && cursorOutline) {
      cursorDot.style.opacity = "1";
      cursorOutline.style.opacity = "1";
    }
  }

  function hideCursor() {
    if (cursorDot && cursorOutline) {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
    }
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    if (
      mouseX >= 0 &&
      mouseX <= window.innerWidth &&
      mouseY >= 0 &&
      mouseY <= window.innerHeight
    ) {
      showCursor();
      resetInactivityTimer();
    } else {
      hideCursor();
    }
  });

  document.addEventListener("mouseleave", () => {
    hideCursor();
    clearTimeout(inactivityTimer);
  });

  document.addEventListener("mouseenter", () => {
    showCursor();
    resetInactivityTimer();
  });

  document.addEventListener("mouseover", (e) => {
    if (
      e.target.classList.contains("hoverable") ||
      e.target.closest(".hoverable")
    ) {
      cursorOutline.classList.add("hovered");
    } else {
      cursorOutline.classList.remove("hovered");
    }
  });

  const style = document.createElement("style");
  style.textContent = `
    .cursor-dot, .cursor-outline {
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

function handleScrollAnimation() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  reveals.forEach((reveal) => observer.observe(reveal));
}

document.addEventListener("DOMContentLoaded", () => {
  handleScrollAnimation();

  setTimeout(() => {
    handleScrollAnimation();
  }, 100);
});
