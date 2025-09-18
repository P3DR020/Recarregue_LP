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


// Carrossel de Camisas
document.addEventListener('DOMContentLoaded', function () {
    const carrosselContainer = document.querySelector('.carrossel-camisas');
    const slidesCamisas = document.querySelector('.slides-camisas');
    const camisaItems = document.querySelectorAll('.slides-camisas .camisa-item');
    const prevCamisaBtn = document.getElementById('prevCamisaBtn');
    const nextCamisaBtn = document.getElementById('nextCamisaBtn');

    let currentCamisaIndex = 0;
    const totalCamisas = camisaItems.length;

    // --- Variáveis do Autoplay (sem alteração) ---
    let autoPlayInterval;
    const autoPlayTime = 3000;

    // --- NOVAS: Variáveis para controlar o Swipe/Drag ---
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe

    function updateCamisaCarousel() {
        const offset = -currentCamisaIndex * 100;
        slidesCamisas.style.transform = `translateX(${offset}%)`;
        slidesCamisas.style.transition = 'transform 0.5s ease-in-out'; // Garante a animação de snap
    }

    function goToNextSlide() {
        currentCamisaIndex = (currentCamisaIndex < totalCamisas - 1) ? currentCamisaIndex + 1 : 0;
        updateCamisaCarousel();
    }

    function goToPrevSlide() {
        currentCamisaIndex = (currentCamisaIndex > 0) ? currentCamisaIndex - 1 : totalCamisas - 1;
        updateCamisaCarousel();
    }

    // --- Funções de Autoplay (com pequenas modificações) ---
    function startAutoPlay() {
        clearInterval(autoPlayInterval); // Limpa timer antigo
        autoPlayInterval = setInterval(goToNextSlide, autoPlayTime);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // --- Event Listeners dos Botões (com reset do autoplay) ---
    prevCamisaBtn.addEventListener('click', () => {
        stopAutoPlay();
        goToPrevSlide();
        startAutoPlay();
    });

    nextCamisaBtn.addEventListener('click', () => {
        stopAutoPlay();
        goToNextSlide();
        startAutoPlay();
    });

    // --- NOVAS: Funções e Eventos para o Swipe ---

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        slidesCamisas.style.transition = 'none'; // Remove a transição durante o arraste
        stopAutoPlay(); // Pausa o autoplay
        prevTranslate = -currentCamisaIndex * carrosselContainer.offsetWidth;
    }

    function dragMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            slidesCamisas.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // Decide se muda de slide
        if (movedBy < -swipeThreshold) { // Swipe para a esquerda
            goToNextSlide();
        } else if (movedBy > swipeThreshold) { // Swipe para a direita
            goToPrevSlide();
        } else {
            updateCamisaCarousel(); // Volta para o slide atual se o swipe foi curto
        }

        startAutoPlay(); // Reinicia o autoplay
    }

    // Adiciona os event listeners para mouse e toque
    carrosselContainer.addEventListener('mousedown', dragStart);
    carrosselContainer.addEventListener('touchstart', dragStart, { passive: true });

    carrosselContainer.addEventListener('mousemove', dragMove);
    carrosselContainer.addEventListener('touchmove', dragMove, { passive: true });

    carrosselContainer.addEventListener('mouseup', dragEnd);
    carrosselContainer.addEventListener('mouseleave', dragEnd); // Se o mouse sair da área
    carrosselContainer.addEventListener('touchend', dragEnd);


    // --- Inicialização (sem alteração) ---
    updateCamisaCarousel();
    startAutoPlay();
});



//SETA Q MEXE
document.addEventListener('DOMContentLoaded', function () {
  // Pega o elemento da seta pelo ID que definimos no HTML
  const scrollArrow = document.getElementById('scroll-down-arrow');

  // Verifica se o elemento existe na página
  if (scrollArrow) {
    // Adiciona um "ouvinte" de evento de clique
    scrollArrow.addEventListener('click', function () {
      // Rola a página para baixo de forma suave
      // A distância rolada é a altura da janela de visualização do navegador
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
});



// Controle de vídeo com botão play/pause
const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const videoWrapper = document.querySelector('.video-wrapper');

// Adiciona um evento para o botão de play/pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        video.muted = false; // Tira o mudo ao dar play
        videoWrapper.classList.add('playing');
    } else {
        video.pause();
        videoWrapper.classList.remove('playing');
    }
});

// Faz o botão reaparecer quando o vídeo é pausado
video.addEventListener('pause', () => {
  videoWrapper.classList.remove('playing');
});

// Faz o botão reaparecer quando o vídeo termina
video.addEventListener('ended', () => {
  videoWrapper.classList.remove('playing');
});


// ===================
// Animação de Fade-in
// ===================

// Adiciona a classe 'hidden' a todas as seções que você quer animar
const sectionsToAnimate = document.querySelectorAll(
  '.carrossel, .sobreNos, .video, .camisas-secao, .inscricao, .saveTheDate, .links, .localizacao, .footer'
);

sectionsToAnimate.forEach(section => {
  section.classList.add('hidden');
});

// Cria um observador
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Se a seção está na tela, adicione a classe 'visible'
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  rootMargin: '0px',
  threshold: 0.2 // Começa a animar quando 10% da seção está visível
});

// Observa cada seção
sectionsToAnimate.forEach(section => {
  observer.observe(section);
});