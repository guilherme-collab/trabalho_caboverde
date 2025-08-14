// Seleção de elementos
const topBtn = document.getElementById('topBtn');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');
const heroText = document.querySelector('.hero-text');

// --------- BOTÃO TOPO ---------
window.addEventListener('scroll', () => {
  // Mostrar/ocultar botão topo
  if(window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }

  // Animação fade-in seções
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if(top < windowHeight - 100) {
      section.classList.add('show');
    }
  });

  // Destacar link do menu
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const top = section.getBoundingClientRect().top;
    if(top <= 150 && top >= -section.offsetHeight + 150) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if(activeLink) activeLink.classList.add('active');
    }
  });
});

// Scroll suave botão topo
topBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

// --------- LIGHTBOX GALERIA ---------
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.background = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '1000';
    lightbox.addEventListener('click', () => lightbox.remove());

    const imgClone = img.cloneNode();
    imgClone.style.maxWidth = '90%';
    imgClone.style.maxHeight = '90%';
    imgClone.style.borderRadius = '10px';
    lightbox.appendChild(imgClone);

    document.body.appendChild(lightbox);
  });
});

// --------- TYPING EFFECT HERO ---------
const phrases = ["Explore praias paradisíacas", "Descubra a cultura vibrante", "Mergulhe na história fascinante"];
let i = 0;
let j = 0;
let currentPhrase = '';
let isDeleting = false;

function type() {
  const heroP = heroText.querySelector('p');
  if(!heroP) return;
  
  if(i >= phrases.length) i = 0;
  const fullPhrase = phrases[i];

  if(!isDeleting) {
    currentPhrase = fullPhrase.slice(0, j+1);
    heroP.textContent = currentPhrase;
    j++;
    if(j === fullPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    currentPhrase = fullPhrase.slice(0, j-1);
    heroP.textContent = currentPhrase;
    j--;
    if(j === 0) {
      isDeleting = false;
      i++;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}

type();