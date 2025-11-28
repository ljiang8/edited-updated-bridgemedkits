// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Kits shipped counter on home page
const counterEl = document.querySelector('.counter-number');

if (counterEl) {
  const targetValue = parseInt(counterEl.dataset.target, 10) || 0;
  let started = false;

  const animateCounter = () => {
    if (started) return;
    started = true;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * targetValue);
      counterEl.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(counterEl);
}

// Contact form -> open email client via mailto link
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = document.getElementById('form-status');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message
    ];

    const mailto = `mailto:bridgemedkits@gmail.com?subject=${encodeURIComponent('BridgeMedKits Website Contact')}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailto;

    if (statusEl) {
      statusEl.textContent = 'Your email app should open in a moment. If it does not, you can email us directly at bridgemedkits@gmail.com.';
    }
  });
}
