document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. МОБИЛЬНОЕ МЕНЮ
  // ==========================================
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 2. ИНТЕРАКТИВ ВИДЕО-ВИЗИТКИ
  // ==========================================
  const introVideo = document.getElementById('introVideo');
  const playBtn = document.getElementById('playBtn');
  const videoCard = document.querySelector('.video-card');

  if (introVideo && playBtn) {
    playBtn.addEventListener('click', () => {
      if (introVideo.paused) {
        introVideo.play();
        introVideo.controls = true;
        videoCard.classList.add('playing');
      }
    });

    introVideo.addEventListener('pause', () => {
      if (introVideo.paused && !introVideo.ended) {
        videoCard.classList.remove('playing');
      }
    });
  }

  // ==========================================
  // 3. ТЕСТ-КВИЗ С ГЕНЕРАЦИЕЙ ССЫЛКИ ДЛЯ TG
  // ==========================================
  const quizSteps = document.querySelectorAll('.quiz-step');
  const progressBar = document.getElementById('quizProgress');
  const quizResult = document.getElementById('quizResult');
  const quizSummary = document.getElementById('quizSummary');
  const quizTgButton = document.getElementById('quizTgButton');

  // Укажите username аккаунта Telegram без символа @
  const TELEGRAM_USERNAME = 'your_username';

  const userAnswers = {
    problem: '',
    experience: '',
    format: ''
  };

  let currentStep = 1;
  const totalSteps = quizSteps.length;

  document.querySelectorAll('.quiz-option').forEach(button => {
    button.addEventListener('click', (e) => {
      const parentStep = e.target.closest('.quiz-step');
      const stepIndex = parseInt(parentStep.dataset.step, 10);
      const answerValue = e.target.dataset.answer;

      if (stepIndex === 1) userAnswers.problem = answerValue;
      if (stepIndex === 2) userAnswers.experience = answerValue;
      if (stepIndex === 3) userAnswers.format = answerValue;

      parentStep.classList.remove('active');

      if (stepIndex < totalSteps) {
        currentStep++;
        const nextStep = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        if (nextStep) nextStep.classList.add('active');
        if (progressBar) progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
      } else {
        // Завершение теста
        if (progressBar) progressBar.style.width = '100%';
        showQuizResults();
      }
    });
  });

  function showQuizResults() {
    if (quizResult && quizSummary && quizTgButton) {
      quizResult.classList.add('active');
      
      quizSummary.innerHTML = `
        <strong>Ваш сформированный запрос:</strong><br>
        • Состояние: ${userAnswers.problem}<br>
        • Опыт: ${userAnswers.experience}<br>
        • Формат: ${userAnswers.format}
      `;

      // Генерация текста для Telegram
      const tgMessage = `Здравствуйте, Анна! Я прошел(ла) экспресс-тест на вашем сайте.%0A%0A` +
        `Мой запрос:%0A` +
        `• Беспокоит: ${encodeURIComponent(userAnswers.problem)}%0A` +
        `• Предыдущий опыт: ${encodeURIComponent(userAnswers.experience)}%0A` +
        `• Предпочтительный формат: ${encodeURIComponent(userAnswers.format)}%0A%0A` +
        `Хочу уточнить возможность записи!`;

      quizTgButton.href = `https://t.me/${TELEGRAM_USERNAME}?text=${tgMessage}`;
    }
  }

  // ==========================================
  // 4. КАЛЕНДАРЬ ЗАПИСИ
  // ==========================================
  const daysContainer = document.getElementById('calendarDays');
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');
  const selectedDateTimeText = document.getElementById('selectedDateTimeText');
  const slotPills = document.querySelectorAll('.slot-pill');

  let selectedDay = null;
  let selectedTime = null;

  // Генерация демонстрационных дней (Октябрь)
  if (daysContainer) {
    // 3 пустых слота для сдвига недели
    for (let i = 0; i < 3; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'calendar-day empty';
      daysContainer.appendChild(emptyDiv);
    }

    // Дни с 1 по 31
    for (let d = 1; d <= 31; d++) {
      const dayBtn = document.createElement('button');
      dayBtn.className = 'calendar-day available';
      dayBtn.textContent = d;

      // Делаем прошедшие дни или воскресенья условно неактивными для реализма
      if (d < 5 || d % 7 === 4) {
        dayBtn.classList.remove('available');
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
      }

      dayBtn.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        dayBtn.classList.add('selected');
        selectedDay = `${d} Октября`;
        updateBookingButton();
      });

      daysContainer.appendChild(dayBtn);
    }
  }

  // Выбор слота времени
  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedTime = pill.dataset.time;
      updateBookingButton();
    });
  });

  function updateBookingButton() {
    if (selectedDay && selectedTime) {
      confirmBookingBtn.disabled = false;
      selectedDateTimeText.textContent = `${selectedDay}, ${selectedTime}`;
    }
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', () => {
      const text = `Здравствуйте, Анна! Хочу забронировать ознакомительную встречу на дату: ${selectedDay} в ${selectedTime}.`;
      window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

});