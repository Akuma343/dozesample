// ===============================
// Smooth scroll for navigation
// ===============================
const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===============================
// Animate menu items on scroll
// ===============================
function animateMenuItems() {
  const items = document.querySelectorAll('.menu-item');
  const trigger = window.innerHeight * 0.9;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.style.animationPlayState = 'running';
    }
  });
}

window.addEventListener('scroll', animateMenuItems);
window.addEventListener('DOMContentLoaded', animateMenuItems);

// ===============================
// Carousel Logic (CENTERED CUP)
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('#carousel-items .menu-item');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');
  const carouselContainer = document.getElementById('carousel-items');

  let current = 2; // Start at Cold Brew

  const itemWidth = 180; // must match CSS
  const gap = 16;        // 1rem
  const slideDistance = itemWidth + gap;

  function updateCarousel() {
    const viewportCenter = window.innerWidth / 2;

    // Center the ACTIVE item
    const itemCenter =
      current * slideDistance +
      itemWidth / 2;

    const translateX = viewportCenter - itemCenter;

    carouselContainer.style.transform = `translateX(${translateX}px)`;

    // Update scale / opacity classes
    items.forEach((item, index) => {
      item.classList.remove(
        'carousel-center',
        'carousel-side',
        'carousel-far'
      );

      const diff = Math.abs(index - current);

      if (diff === 0) {
        item.classList.add('carousel-center');
      } else if (diff === 1) {
        item.classList.add('carousel-side');
      } else if (diff === 2) {
        item.classList.add('carousel-far');
      }
    });
  }

  leftBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
});

// ===============================
// Auto-scrolling Gallery Track
// ===============================
const track = document.getElementById('carouselTrack');

if (track) {
  let scrollAmount = 0;
  const images = track.children;
  const totalImages = images.length;
  const cloneCount = 4;

  // Clone first images for seamless loop
  for (let i = 0; i < cloneCount; i++) {
    const clone = images[i].cloneNode(true);
    track.appendChild(clone);
  }

  function autoScroll() {
    const firstImgWidth = images[0].offsetWidth + 24; // image + gap
    scrollAmount += 1;
    track.scrollLeft = scrollAmount;

    if (scrollAmount >= firstImgWidth * totalImages) {
      scrollAmount = 0;
      track.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  window.onload = () => {
    requestAnimationFrame(autoScroll);
  };
}
