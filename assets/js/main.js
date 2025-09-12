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
document.addEventListener('DOMContentLoaded', function() {
    const carrosselContainer = document.querySelector('.carrossel-camisas'); // NOVO: Seleciona o container principal
    const slidesCamisas = document.querySelector('.slides-camisas');
    const camisaItems = document.querySelectorAll('.slides-camisas .camisa-item');
    const prevCamisaBtn = document.getElementById('prevCamisaBtn');
    const nextCamisaBtn = document.getElementById('nextCamisaBtn');

    let currentCamisaIndex = 0;
    const totalCamisas = camisaItems.length;

    // NOVO: Variáveis para controlar o autoplay
    let autoPlayInterval;
    const autoPlayTime = 3000; // Tempo em milissegundos (ex: 3 segundos)

    function updateCamisaCarousel() {
        const offset = -currentCamisaIndex * 100; // Move por 100% da largura de um item
        slidesCamisas.style.transform = `translateX(${offset}%)`;
    }
    
    // NOVO: Função que avança para o próximo slide (lógica do botão 'next')
    function goToNextSlide() {
        currentCamisaIndex = (currentCamisaIndex < totalCamisas - 1) ? currentCamisaIndex + 1 : 0;
        updateCamisaCarousel();
    }

    // NOVO: Funções para iniciar e parar o autoplay
    function startAutoPlay() {
        // Limpa qualquer intervalo anterior para evitar múltiplos timers rodando
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(goToNextSlide, autoPlayTime);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // --- Event Listeners dos Botões (com reset do autoplay) ---

    prevCamisaBtn.addEventListener('click', () => {
        stopAutoPlay(); // Para o automático
        currentCamisaIndex = (currentCamisaIndex > 0) ? currentCamisaIndex - 1 : totalCamisas - 1;
        updateCamisaCarousel();
        startAutoPlay(); // Recomeça a contagem
    });

    nextCamisaBtn.addEventListener('click', () => {
        stopAutoPlay(); // Para o automático
        goToNextSlide(); // Avança para o próximo
        startAutoPlay(); // Recomeça a contagem
    });

    // NOVO: Pausa o carrossel quando o mouse está sobre ele
    carrosselContainer.addEventListener('mouseenter', stopAutoPlay);
    carrosselContainer.addEventListener('mouseleave', startAutoPlay);

    // Inicializa o carrossel
    updateCamisaCarousel();
    startAutoPlay(); // Inicia o autoplay assim que a página carrega
});




// Fim do código




document.addEventListener('DOMContentLoaded', function() {
    // Pega o elemento da seta pelo ID que definimos no HTML
    const scrollArrow = document.getElementById('scroll-down-arrow');

    // Verifica se o elemento existe na página
    if (scrollArrow) {
        // Adiciona um "ouvinte" de evento de clique
        scrollArrow.addEventListener('click', function() {
            // Rola a página para baixo de forma suave
            // A distância rolada é a altura da janela de visualização do navegador
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});