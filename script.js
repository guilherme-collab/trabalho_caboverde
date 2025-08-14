const topBtn = document.getElementById('topBtn');
window.onscroll = function() {
  if(window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }

  // Animação fade-in das seções
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if(top < windowHeight - 100) {
      section.classList.add('show');
    }
  });
};

topBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});