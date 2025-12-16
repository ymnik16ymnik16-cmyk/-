/*
script.js
JavaScript для сайта "Конструктор | Мебель на заказ г. Лянтор"
Версия: 1.0
Дата создания: 2024
Основные функции:
1. Мобильное меню
2. Плавная прокрутка
*/

// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Переключение класса active для меню
            navMenu.classList.toggle('active');
            
            // Смена иконки кнопки
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Закрытие меню при клике вне меню
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // 2. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Пропускаем ссылки на "#" (пустые якоря)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Вычисляем позицию для прокрутки с учетом высоты шапки
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Фокус на целевом элементе для доступности
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.removeAttribute('tabindex');
            }
        });
    });
    
    // 3. Подсветка активного раздела при прокрутке
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Вызов функции при загрузке и прокрутке
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink);
    
    // 4. Анимация появления элементов при прокрутке
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.service-card, .process-step, .feature, .testimonial-card, .creativity-step');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    animatedElements = document.querySelectorAll('.service-card, .process-step, .feature, .testimonial-card, .creativity-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // 5. Подтверждение отправки формы (если формы будут добавлены в будущем)
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь будет код для отправки формы
            // Например, через Fetch API или AJAX
            
            // Временное уведомление для демонстрации
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    });
    
    // 6. Анимация для статистики в герое
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        });
    }
    
    // Запуск анимации статистики при прокрутке к герою
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
});