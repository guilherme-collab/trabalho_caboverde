// BOTÃO TOPO E SCROLL ANIMADO
const topBtn = document.getElementById('topBtn');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.menu a');
window.addEventListener('scroll', () => {
  // Botão topo
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  
  // Fade-in seções
  sections.forEach(section => {
    if(section.getBoundingClientRect().top < window.innerHeight - 100){
      section.classList.add('show');
    }
  });

  // Destacar menu ativo
  sections.forEach(section => {
    if(section.getBoundingClientRect().top <= 150){
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.menu a[href="#${section.id}"]`);
      if(activeLink) activeLink.classList.add('active');
    }
  });
});

topBtn.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

// LIGHTBOX GALERIA
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    Object.assign(lightbox.style, {
      position: 'fixed', top:0, left:0,
      width:'100%', height:'100%',
      background:'rgba(0,0,0,0.85)',
      display:'flex', justifyContent:'center', alignItems:'center',
      zIndex:'1000', cursor:'pointer'
    });
    lightbox.addEventListener('click', () => lightbox.remove());
    const imgClone = img.cloneNode();
    imgClone.style.maxWidth='90%';
    imgClone.style.maxHeight='90%';
    imgClone.style.borderRadius='10px';
    lightbox.appendChild(imgClone);
    document.body.appendChild(lightbox);
  });
});

// TYPING HERO
const typingEl = document.querySelector('.typing');
const phrases = ["praias paradisíacas", "cultura vibrante", "história fascinante"];
let i=0,j=0,current='',isDeleting=false;
function type(){
  const full = phrases[i];
  if(!isDeleting){
    current = full.slice(0,j+1);
    typingEl.textContent = current;
    j++;
    if(j===full.length){ isDeleting=true; setTimeout(type,1500); return; }
  } else {
    current = full.slice(0,j-1);
    typingEl.textContent = current;
    j--;
    if(j===0){ isDeleting=false; i++; if(i>=phrases.length)i=0; }
  }
  setTimeout(type,isDeleting?50:120);
}
type();