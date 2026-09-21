document.addEventListener('DOMContentLoaded', () => {
  // 1. Логика переключения превью (Табы слайдов)
  const tabBtn1 = document.getElementById('tab-btn-1');
  const tabBtn2 = document.getElementById('tab-btn-2');
  const img1 = document.getElementById('preview-img-1');
  const img2 = document.getElementById('preview-img-2');
  const filenameLabel = document.getElementById('preview-filename');

  if (tabBtn1 && tabBtn2 && img1 && img2) {
    tabBtn1.addEventListener('click', () => {
      tabBtn1.classList.add('active');
      tabBtn2.classList.remove('active');

      img1.classList.add('active');
      img2.classList.remove('active');

      filenameLabel.textContent = 'slide-01-cover.pdf (1920x1080)';
    });

    tabBtn2.addEventListener('click', () => {
      tabBtn2.classList.add('active');
      tabBtn1.classList.remove('active');

      img2.classList.add('active');
      img1.classList.remove('active');

      filenameLabel.textContent = 'slide-12-cold-outreach.pdf (1920x1080)';
    });
  }

  // 2. Аккордеон FAQ: закрываем остальные элементы при открытии нового
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.open) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });

  console.log('AI Co-Founder: Business OS landing loaded with dual preview tabs.');
});