// Функція відкриття модального вікна курсу
function openCourseModal(courseTitle) {
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('modalCourseTitle');
  
  // Встановлюємо заголовок
  modalTitle.textContent = courseTitle;
  
  // Приховуємо всі деталі курсів
  const allCourseDetails = document.querySelectorAll('.course-details');
  allCourseDetails.forEach(detail => detail.style.display = 'none');
  
  // Показуємо потрібний курс
  let courseId = '';
  switch(courseTitle) {
    case 'A1 (Starter → Znatok)':
      courseId = 'courseA1';
      break;
    case 'A2 (Erudyt → Flahman)':
      courseId = 'courseA2';
      break;
    case 'B1 (Fakhivets → Profi)':
      courseId = 'courseB1';
      break;
    case 'B2 (Fortgeschritten → Expert)':
      courseId = 'courseB2';
      break;
    case 'C1 (Master → Profi+)':
      courseId = 'courseC1';
      break;
    case '👦 Німецька для підлітків':
      courseId = 'courseTeens';
      break;
    case '🎯 Підготовка до іспитів':
      courseId = 'courseExams';
      break;
    case '💬 Мовний клуб':
      courseId = 'courseClub';
      break;
    case '🎬 Телеграм-канал із фільмами':
      courseId = 'courseTelegram';
      break;
    default:
      courseId = 'courseA1';
  }
  
  const targetCourse = document.getElementById(courseId);
  if (targetCourse) {
    targetCourse.style.display = 'block';
  }
  
  // Показуємо модальне вікно
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Функція закриття модального вікна
function closeCourseModal() {
  const modal = document.getElementById('courseModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Очищаємо форму
  const form = document.getElementById('courseForm');
  if (form) {
    form.reset();
    
    // Приховуємо повідомлення
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
  }
}

// Закриття модального вікна при кліку на фон
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('courseModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeCourseModal();
      }
    });
  }
});

// Заглушки для нових функцій кнопок
function openPriceModal() {
  alert('Функція "Дізнатися ціну" буде реалізована пізніше');
}

function openTrialModal() {
  alert('Функція "Записатися на пробний" буде реалізована пізніше');
}

function subscribeTelegram() {
  // Перенаправляємо на сторінку підписки на Telegram-канал
  window.open('https://chaikaonline.sitepulse.com.ua/filmsclub?fbclid=PAdGRleAMtVa9leHRuA2FlbQIxMQABp3TcDqk--uPpdZyYGasX9FK34eNvwrdNBIXpDovvY-OKeJ_10MfWCYwyAP2y_aem_aJsWEyPPcEU2nB6XGVRxNw', '_blank');
}
