
// Modern Portfolio JavaScript with Enhanced Interactions

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupSkillBars();
        this.setupTypingEffect();
    }

    // Navigation Setup
    setupNavigation() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.toggleHamburger(navToggle);
            });

            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    this.toggleHamburger(navToggle, false);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    this.toggleHamburger(navToggle, false);
                }
            });
        }
    }

    toggleHamburger(toggle, force = null) {
        const spans = toggle.querySelectorAll('span');
        const isActive = force !== null ? force : toggle.classList.contains('active');
        
        if (force === false || isActive) {
            toggle.classList.remove('active');
            spans[0].style.transform = 'rotate(0deg)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0deg)';
        } else {
            toggle.classList.add('active');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        const header = document.querySelector('.header');
        const heroScroll = document.querySelector('.hero__scroll');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Header background effect
            if (header) {
                if (scrollY > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = 'none';
                }
            }

            // Hide scroll indicator
            if (heroScroll) {
                heroScroll.style.opacity = scrollY > 300 ? '0' : '1';
            }

            // Parallax effect for hero background
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animation Setup
    setupAnimations() {
        this.observeElements();
        this.setupCardHoverEffects();
        this.setupButtonEffects();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animation
        const animatedElements = document.querySelectorAll(`
            .preview__card,
            .about__section,
            .stat__item,
            .skill__item,
            .project__card,
            .contact__item,
            .tool__item
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll(`
            .preview__card,
            .project__card,
            .skill__item,
            .stat__item
        `);

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (btn.classList.contains('btn--primary')) {
                    btn.style.transform = 'translateY(-3px)';
                    btn.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
                }
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '';
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.querySelector('.contact__form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                form.reset();
                
                // Show success message
                this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            }, 2000);
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill__bar');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.setProperty('--width', width);
                    bar.style.animation = 'fillBar 2s ease-out forwards';
                }
            });
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Typing Effect for Hero
    setupTypingEffect() {
        const heroSubtitle = document.querySelector('.hero__subtitle');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get random color
    getRandomColor() {
        const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// Page-specific enhancements
const pageEnhancements = {
    // Home page particles effect
    initParticles() {
        if (document.querySelector('.hero')) {
            this.createParticles();
        }
    },

    createParticles() {
        const hero = document.querySelector('.hero');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }

        hero.appendChild(particleContainer);
    },

    // Projects page filters
    initProjectFilters() {
        const projectsPage = document.querySelector('.projects');
        if (projectsPage) {
            // Add filter buttons (could be expanded)
            console.log('Projects page loaded');
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    pageEnhancements.initParticles();
    pageEnhancements.initProjectFilters();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
