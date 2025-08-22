// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeForm();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 31, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 40px rgba(10, 26, 10, 0.9)';
        } else {
            navbar.style.background = 'rgba(15, 31, 15, 0.95)';
            navbar.style.boxShadow = '0 2px 30px rgba(10, 26, 10, 0.8)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature, .detail, .form-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animate stats on hero section
    animateStats();
}

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    let current = 0;
    const increment = number / 60; // 60 frames for smooth animation

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16); // ~60fps
}

// Form functionality
function initializeForm() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.querySelector('.submit-button');
    
    if (!form) return;

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearErrors(this);
        });
    });

    // Age validation - updated to 18 years minimum
    const ageInputs = document.querySelectorAll('#age1, #age2');
    ageInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 18) {
                showError(this, 'Solo le anime di almeno 18 anni possono affrontare questa sfida');
            } else if (this.value > 99) {
                showError(this, 'Inserisci un\'età valida per i mortali');
            }
        });
    });

    // Email validation
    const emailInputs = document.querySelectorAll('#email1, #email2');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!isValidEmail(this.value) && this.value !== '') {
                showError(this, 'Il contatto spirituale deve essere valido per ricevere i messaggi dall\'aldilà');
            }
        });
    });

    // Phone validation
    const phoneInputs = document.querySelectorAll('#phone1, #phone2');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Auto-format phone number
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + ' ' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                }
            }
            this.value = value;
        });
    });
}

// Form validation functions
function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Check if emails are different
    const email1 = document.getElementById('email1').value;
    const email2 = document.getElementById('email2').value;
    if (email1 && email2 && email1 === email2) {
        showError(document.getElementById('email2'), 'Le due anime devono avere contatti spirituali separati');
        isValid = false;
    }

    // Check terms and conditions
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'Devi sottoscrivere il patto con il tuo sangue');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.required && !value) {
        showError(field, 'Il vuoto non può essere accettato dai guardiani dell\'oscurità');
        return false;
    }

    if (field.type === 'email' && value && !isValidEmail(value)) {
        showError(field, 'Il portale spirituale deve essere accessibile');
        return false;
    }

    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showError(field, 'La linea d\'emergenza deve poterci raggiungere nell\'abisso');
        return false;
    }

    if (field.type === 'number') {
        const num = parseInt(value);
        if (field.min && num < parseInt(field.min)) {
            showError(field, `Solo chi ha vissuto almeno ${field.min} anni può affrontare le tenebre`);
            return false;
        }
        if (field.max && num > parseInt(field.max)) {
            showError(field, `Gli immortali non sono ammessi a questa prova`);
            return false;
        }
    }

    clearErrors(field);
    return true;
}

function showError(field, message) {
    clearErrors(field);
    
    field.style.borderColor = '#0a1a0a';
    field.style.boxShadow = '0 0 10px rgba(10, 26, 10, 0.5)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#0a1a0a';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.style.textShadow = '0 0 5px rgba(10, 26, 10, 0.8)';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearErrors(field) {
    field.style.borderColor = 'rgba(45, 74, 45, 0.3)';
    field.style.boxShadow = 'none';
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s]{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Form submission
function submitForm() {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invocazione in corso...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 3000); // Increased to 3 seconds for more dramatic effect
}

function showSuccessMessage() {
    // Create success modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 26, 10, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(145deg, #1a2f1a, #0f1f0f);
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        max-width: 600px;
        margin: 20px;
        transform: scale(0.8);
        transition: transform 0.5s ease;
        border: 2px solid #d4af37;
        box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
    `;

    modalContent.innerHTML = `
        <div style="color: #d4af37; font-size: 5rem; margin-bottom: 1.5rem; animation: pulse-glow 2s infinite;">
            <i class="fas fa-magic"></i>
        </div>
        <h2 style="color: #d4af37; margin-bottom: 1.5rem; font-size: 2rem; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);">
            Il Patto è Sigillato!
        </h2>
        <p style="color: #cccccc; line-height: 1.8; margin-bottom: 2rem; font-size: 1.1rem;">
            Le forze dell'oscurità hanno accettato la vostra offerta. Le anime prescelte riceveranno la convocazione 
            attraverso i sussurri del vento entro la prossima luna piena. 
            <br><br>
            <em style="color: #2d4a2d;">Preparatevi... il destino vi attende nelle tenebre.</em>
        </p>
        <button onclick="this.closest('.modal').remove()" style="
            background: linear-gradient(135deg, #1a2f1a, #1a3a1a, #0a1a0a);
            color: #d4af37;
            border: 2px solid #d4af37;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.1rem;
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 0 30px rgba(212, 175, 55, 0.6)'" 
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 0 20px rgba(212, 175, 55, 0.3)'">
            Che le Tenebre vi Proteggano
        </button>
    `;

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Reset form
    document.getElementById('registrationForm').reset();
}

// Scroll effects
function initializeScrollEffects() {
    const ctaButton = document.querySelector('.cta-button');
    
    // Add click effect to CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(212, 175, 55, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.8s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        });
    }

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced easter eggs for dark theme
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add treasure map animation
    const treasureMap = document.querySelector('.treasure-map');
    if (treasureMap) {
        treasureMap.style.animation = 'dark-ritual 3s ease-in-out';
        treasureMap.style.color = '#0a1a0a';
        
        // Add dark ritual animation
        const ritualStyle = document.createElement('style');
        ritualStyle.textContent = `
            @keyframes dark-ritual {
                0% { transform: rotate(0deg) scale(1); color: #d4af37; }
                25% { transform: rotate(90deg) scale(1.3); color: #0a1a0a; }
                50% { transform: rotate(180deg) scale(1.5); color: #2d4a2d; }
                75% { transform: rotate(270deg) scale(1.3); color: #0a1a0a; }
                100% { transform: rotate(360deg) scale(1); color: #d4af37; }
            }
        `;
        document.head.appendChild(ritualStyle);
        
        // Add spooky message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 26, 10, 0.9);
            color: #d4af37;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #0a1a0a;
            font-size: 1.5rem;
            text-align: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
            box-shadow: 0 0 30px rgba(10, 26, 10, 0.6);
        `;
        message.innerHTML = '🌿 Gli spiriti della foresta si sono risvegliati... 🌿';
        document.body.appendChild(message);
        
        setTimeout(() => {
            treasureMap.style.animation = 'float 6s ease-in-out infinite';
            treasureMap.style.color = '#d4af37';
            message.remove();
        }, 3000);
    }
}

// Performance optimization
window.addEventListener('load', function() {
    // Preload critical images
    const imageUrls = [
        // Add any critical image URLs here if needed
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added later for offline functionality
    });
} 