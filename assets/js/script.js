class PsyBranchApp {
    constructor() {
        this.animationEnabled = true;
        this.init();
    }

    init() {
        this.setCurrentYear();
        this.setupAnimations();
        this.setupInteractions();
        this.setupAnalytics();
    }

    setCurrentYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    setupAnimations() {
        if (!this.animationEnabled) return;

        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = [
                { selector: '.logo img', delay: 0.1 },
                { selector: '.site-title h1', delay: 0.2 },
                { selector: '.tagline', delay: 0.3 },
                ...Array.from(document.querySelectorAll('.category')).map((el, i) => ({
                    element: el,
                    delay: 0.4 + (i * 0.1)
                }))
            ];

            animatedElements.forEach(({ selector, element, delay }) => {
                const el = element || document.querySelector(selector);
                if (el) {
                    el.classList.add('pop-out');
                    el.style.animationDelay = `${delay}s`;
                }
            });
        });
    }

    setupInteractions() {
        // Add ripple effect to buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.button a')) {
                this.createRipple(e, e.target.closest('.button a'));
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused.closest('.button a')) {
                    e.preventDefault();
                    focused.click();
                }
            }
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s linear;
            z-index: 0;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    setupAnalytics() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.button a');
            if (link) {
                const linkText = link.textContent.trim();
                console.log(`Clicked: ${linkText}`);
                // Here you can add Google Analytics or other tracking
            }
        });
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app
new PsyBranchApp();