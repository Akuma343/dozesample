// Smooth scroll for navigation
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animate menu items on scroll
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

document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('#carousel-items .menu-item');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');
  const carouselContainer = document.getElementById('carousel-items');
  let current = 2; // Start from 3rd item (Cold Brew)
  
  // Calculate slide distance (item width + gap)
  const itemWidth = 180; // matches CSS width
  const gap = 16; // 1rem = 16px
  const slideDistance = itemWidth + gap;

  function updateCarousel() {
    // Calculate the slide offset to center the carousel
    const totalWidth = items.length * slideDistance - gap; // Total width of all items
    const viewportCenter = window.innerWidth / 2;
    const carouselCenter = totalWidth / 2;
    const slideOffset = viewportCenter - carouselCenter - (current * slideDistance) - 180; // Added -50px offset to move right
    
    // Apply sliding animation to container
    carouselContainer.style.transform = `translateX(${slideOffset}px)`;
    
    // Update item classes for scaling and opacity
    items.forEach((item, idx) => {
      item.classList.remove('carousel-center', 'carousel-side', 'carousel-far');
      const diff = idx - current;
      if (diff === 0) {
        item.classList.add('carousel-center');
      } else if (diff === -1 || diff === 1 || diff === items.length - 1 || diff === -(items.length - 1)) {
        // Immediate neighbors (handle wrap-around)
        item.classList.add('carousel-side');
      } else if (diff === -2 || diff === 2 || diff === items.length - 2 || diff === -(items.length - 2)) {
        // Far neighbors (handle wrap-around)
        item.classList.add('carousel-far');
      }
    });
  }

  leftBtn.addEventListener('click', function() {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
  });

  rightBtn.addEventListener('click', function() {
    current = (current + 1) % items.length;
    updateCarousel();
  });

  // Handle window resize to recalculate positioning
  window.addEventListener('resize', updateCarousel);

  updateCarousel();
}); 


   const track = document.getElementById('carouselTrack');
  let scrollAmount = 0;

  // Clone first N images to the end to simulate loop
  const images = track.children;
  const totalImages = images.length;
  const cloneCount = 4;

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

