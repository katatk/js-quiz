window.sr = ScrollReveal({
  reset: true,
  opacity: 1,
  reset: false,
  mobile: false,
  duration: 800,
});


// Scroll reveal calls
window.sr = ScrollReveal();

sr.reveal('.ruler', {
  origin: 'right',
  distance: '100%',
  viewFactor: 0.9
});

sr.reveal('.pencil', {
  opacity: 0,
  origin: 'left',
  distance: '200%',
  viewFactor: 1,
});