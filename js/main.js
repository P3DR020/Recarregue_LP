let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');
    let autoSlideInterval;

    function showSlides(index) {
      slides.forEach((slide, i) => {
        slide.style.display = "none";
        slide.classList.remove('active');
      });

      // Wrap index
      if (index >= slides.length) {
        slideIndex = 0;
      } else if (index < 0) {
        slideIndex = slides.length - 1;
      } else {
        slideIndex = index;
      }

      slides[slideIndex].style.display = "block";
      slides[slideIndex].classList.add('active');
    }

    function nextSlide() {
      showSlides(slideIndex + 1);
    }

    function prevSlide() {
      showSlides(slideIndex - 1);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 2000);
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Show initial slide
    showSlides(slideIndex);

    // Start auto slide
    autoSlideInterval = setInterval(nextSlide, 3000);




// ===================
// Contador regressivo até 25/10/2025
// ===================

const targetDate = new Date(2025, 9, 25, 0, 0, 0); // Outubro é mês 9 (começa do zero)

function animateChange(id, newValue) {
  const element = document.getElementById(id);
  if (element && element.textContent !== newValue) {
    element.textContent = newValue;
    element.classList.add('changed');
    setTimeout(() => element.classList.remove('changed'), 300);
  }
}

function updateCountdown() {
  const now = new Date();
  let diff = targetDate - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  animateChange('days', String(days).padStart(2, '0'));
  animateChange('hours', String(hours).padStart(2, '0'));
  animateChange('minutes', String(minutes).padStart(2, '0'));
  animateChange('seconds', String(seconds).padStart(2, '0'));
}

updateCountdown();
setInterval(updateCountdown, 1000);