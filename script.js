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
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
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
