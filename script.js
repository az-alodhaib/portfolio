document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  element.style.animationPlayState = 'paused';
  observer.observe(element);
});

// Certificate lightbox
const lightbox = document.getElementById('cert-lightbox');
if (lightbox) {
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxVerify = document.getElementById('lightbox-verify');
  let lastTrigger = null;

  function openLightbox(trigger) {
    const { certImg, certTitle, certVerify, certVerifyLabel } = trigger.dataset;
    if (!certImg) return;
    lastTrigger = trigger;
    lightboxImage.src = certImg;
    lightboxImage.alt = certTitle || 'Certificate';
    lightboxTitle.textContent = certTitle || '';
    if (certVerify) {
      lightboxVerify.href = certVerify;
      lightboxVerify.textContent = certVerifyLabel || 'Verify online';
    } else {
      lightboxVerify.removeAttribute('href');
      lightboxVerify.textContent = '';
    }
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lightboxImage.src = '';
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-cert-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((element) => {
    element.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}
