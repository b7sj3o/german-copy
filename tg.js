// Конфігурація Telegram Bot
const TELEGRAM_CONFIG = {
    BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE', // Замініть на ваш bot token
    CHAT_ID: 'YOUR_CHAT_ID_HERE'      // Замініть на ваш chat ID
};

// Функція для відправки повідомлення в Telegram
async function sendToTelegram(name, phone, courseName) {
    const message = `🎓 Нова заявка на курс!\n\n📚 Курс: ${courseName}\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n\n⏰ Час подачі: ${new Date().toLocaleString('uk-UA')}`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
    
    const data = {
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.ok) {
            return { success: true, message: 'Повідомлення надіслано успішно!' };
        } else {
            console.error('Telegram API Error:', result);
            return { success: false, message: 'Помилка при відправці повідомлення' };
        }
    } catch (error) {
        console.error('Network Error:', error);
        return { success: false, message: 'Помилка мережі' };
    }
}

// Функція для відкриття модального вікна
function openCourseModal(courseName) {
    const modal = document.getElementById('courseModal');
    const courseTitle = document.getElementById('modalCourseTitle');
    
    courseTitle.textContent = courseName;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Блокуємо скрол фону
}

// Функція для закриття модального вікна
function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Відновлюємо скрол фону
    
    // Очищаємо форму
    document.getElementById('userName').value = '';
    document.getElementById('userPhone').value = '';
    
    // Приховуємо повідомлення про результат
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
}

// Функція для обробки відправки форми
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const courseName = document.getElementById('modalCourseTitle').textContent;
    
    // Валідація
    if (!name || !phone) {
        showError('Будь ласка, заповніть всі поля');
        return;
    }
    
    if (phone.length < 10) {
        showError('Будь ласка, введіть коректний номер телефону');
        return;
    }
    
    // Показуємо індикатор завантаження
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Надсилаємо...';
    submitBtn.disabled = true;
    
    try {
        // Відправляємо дані в Telegram
        const result = await sendToTelegram(name, phone, courseName);
        
        if (result.success) {
            showSuccess('Дякуємо! Ваша заявка надіслана. Ми зв\'яжемося з вами найближчим часом.');
            
            // Закриваємо модальне вікно через 2 секунди
            setTimeout(() => {
                closeCourseModal();
            }, 2000);
        } else {
            showError('Виникла помилка при відправці заявки. Спробуйте ще раз або зв\'яжіться з нами напряму.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Виникла помилка при відправці заявки. Спробуйте ще раз.');
    } finally {
        // Відновлюємо кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Функція для показу повідомлення про успіх
function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
}

// Функція для показу повідомлення про помилку
function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
}

// Функція для форматування номера телефону
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Видаляємо всі нецифрові символи
    
    if (value.startsWith('380')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+38' + value;
    } else if (value.length > 0 && !value.startsWith('+')) {
        value = '+38' + value;
    }
    
    input.value = value;
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', function() {
    // Додаємо обробник для закриття модального вікна при кліку поза ним
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeCourseModal();
            }
        });
    }
    
    // Додаємо обробник для форматування телефону
    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Додаємо обробник для форми
    const form = document.getElementById('courseForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    console.log('Telegram integration initialized');
});
