// Interactive 3D Effects
class Interactive3D {
    constructor() {
        this.init();
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    init() {
        // Disable heavy 3D effects on mobile for performance
        if (this.isMobile()) {
            return;
        }
        
        this.addMouseTiltEffect();
        this.addScrollParallax();
        this.addGlowEffects();
    }

    addMouseTiltEffect() {
        const cards = document.querySelectorAll('.floating-card, .service-card, .portfolio-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    addScrollParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform += ` translateY(${yPos}px)`;
            });
        });
    }

    addGlowEffects() {
        const glowElements = document.querySelectorAll('.btn, .nav-logo h2');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.filter = 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = 'none';
            });
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollY = 0;
        this.scrollingDown = false;
        this.init();
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    init() {
        if (!this.navbar) return;
        
        // Simplify on mobile
        if (this.isMobile()) {
            window.addEventListener('scroll', () => this.updateActiveNavLink());
            return;
        }

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Update active nav link based on scroll position
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);
        
        // Only trigger if scroll difference is significant (more than 5px)
        if (scrollDifference < 5) {
            return;
        }
        
        // Show navbar when at top of page
        if (currentScrollY < 50) {
            this.navbar.style.transform = 'translateY(0)';
            this.navbar.style.background = 'rgba(11, 20, 38, 0.95)';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            this.scrollingDown = false;
            this.lastScrollY = currentScrollY;
            return;
        }

        // Determine scroll direction
        if (currentScrollY > this.lastScrollY) {
            // Scrolling down - hide navbar
            if (!this.scrollingDown) {
                this.navbar.style.transform = 'translateY(-100%)';
                this.scrollingDown = true;
            }
        } else {
            // Scrolling up - show navbar
            if (this.scrollingDown) {
                this.navbar.style.transform = 'translateY(0)';
                this.navbar.style.background = 'rgba(11, 20, 38, 0.98)';
                this.navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.4)';
                this.scrollingDown = false;
            }
        }

        this.lastScrollY = currentScrollY;
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .timeline-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    init() {
        // Disable parallax on mobile for better performance
        if (this.isMobile()) {
            return;
        }
        
        const floatingCards = document.querySelectorAll('.floating-card');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.form.reset();
        
        // In a real application, you would send the data to a server
        console.log('Form data:', data);
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Particle Effect
class ParticleEffect {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(59, 175, 218, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.init();
    }

    init() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3BAFDA, #C6D300);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Hero Section Enhancements
class HeroEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addTypingEffect();
        this.addHeroParallax();
        this.addButtonRipple();
    }

    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300 + 500);
        });
    }

    addHeroParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    addButtonRipple() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Portfolio Section Enhancements
class PortfolioEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addPortfolioAnimations();
        this.addPortfolioHoverEffects();
        this.addPortfolioParallax();
    }

    addPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        portfolioItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(item);
        });
    }

    addPortfolioHoverEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-20px) scale(1.03)';
                item.style.boxShadow = '0 40px 80px rgba(255, 215, 0, 0.3)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
        });
    }

    addPortfolioParallax() {
        // Removed parallax effect to prevent section overlap
        return;
    }
}

// E-commerce Project Enhanced Interactions
class EcommerceEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addEcommerceInteractions();
        this.addTechShowcaseEffects();
        this.addCodeAnimationEffects();
        this.addStatsCounter();
    }

    addEcommerceInteractions() {
        const ecommerceProject = document.querySelector('.ecommerce-project');
        if (!ecommerceProject) return;

        ecommerceProject.addEventListener('mouseenter', () => {
            this.animateEcommerceProject();
        });

        ecommerceProject.addEventListener('mouseleave', () => {
            this.resetEcommerceProject();
        });
    }

    animateEcommerceProject() {
        const techItems = document.querySelectorAll('.ecommerce-project .tech-item');
        const codeSnippets = document.querySelectorAll('.ecommerce-project .code-snippet');
        
        // Animate tech items with enhanced effects
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'techFloat 1.5s ease-in-out infinite';
                item.style.transform = 'scale(1.2) rotate(5deg)';
                item.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.6)';
            }, index * 80);
        });

        // Show code snippets with enhanced typing effect
        codeSnippets.forEach((snippet, index) => {
            setTimeout(() => {
                snippet.style.opacity = '1';
                snippet.style.transform = 'scale(1.1) rotate(2deg)';
                this.typeCodeSnippet(snippet);
            }, index * 150);
        });
    }

    resetEcommerceProject() {
        const techItems = document.querySelectorAll('.ecommerce-project .tech-item');
        const codeSnippets = document.querySelectorAll('.ecommerce-project .code-snippet');
        
        techItems.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '';
        });

        codeSnippets.forEach(snippet => {
            snippet.style.opacity = '0';
            snippet.style.transform = 'scale(0.8)';
        });
    }

    addTechShowcaseEffects() {
        const techItems = document.querySelectorAll('.ecommerce-project .tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightTechItem(item);
            });

            item.addEventListener('mouseleave', () => {
                this.unhighlightTechItem(item);
            });
        });
    }

    highlightTechItem(item) {
        const tech = item.getAttribute('data-tech');
        const icon = item.querySelector('i');
        
        // Add enhanced pulsing effect
        icon.style.animation = 'techIconPulse 0.4s ease-in-out';
        
        // Add enhanced glow effect
        item.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.8)';
        item.style.transform = 'scale(1.3) rotate(10deg)';
        
        // Show related code snippet with enhanced effect
        this.showRelatedCode(tech);
    }

    unhighlightTechItem(item) {
        const icon = item.querySelector('i');
        icon.style.animation = '';
        item.style.boxShadow = '';
        item.style.transform = '';
    }

    showRelatedCode(tech) {
        const codeSnippets = document.querySelectorAll('.ecommerce-project .code-snippet');
        
        codeSnippets.forEach(snippet => {
            if (snippet.classList.contains(`${tech}-code`)) {
                snippet.style.zIndex = '15';
                snippet.style.transform = 'scale(1.2) rotate(3deg)';
                snippet.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
            } else {
                snippet.style.zIndex = '3';
                snippet.style.transform = 'scale(1)';
                snippet.style.boxShadow = '';
            }
        });
    }

    addCodeAnimationEffects() {
        const codeLines = document.querySelectorAll('.ecommerce-project .code-line');
        
        codeLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                this.highlightCodeLine(line);
            });
        });
    }

    highlightCodeLine(line) {
        line.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
        line.style.padding = '0.3rem 0.7rem';
        line.style.borderRadius = '8px';
        line.style.transition = 'all 0.3s ease';
        line.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
    }

    addStatsCounter() {
        const statNumbers = document.querySelectorAll('.ecommerce-project .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const target = element.textContent.includes('+') ? 
            parseInt(element.textContent.replace('+', '')) : 
            (element.textContent.includes('/') ? element.textContent : 100);
        
        if (typeof target === 'number') {
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + '+';
            }, 16);
        }
    }

    typeCodeSnippet(snippet) {
        const lines = snippet.querySelectorAll('.code-line');
        
        lines.forEach((line, index) => {
            const originalText = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                this.typeText(line, originalText, 40);
            }, index * 200);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Skiller7 Project Enhanced Interactions
class Skiller7Enhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addSkiller7Interactions();
        this.addTechShowcaseEffects();
        this.addCodeAnimationEffects();
        this.addStatsCounter();
    }

    addSkiller7Interactions() {
        const skiller7Project = document.querySelector('.skiller7-project');
        if (!skiller7Project) return;

        skiller7Project.addEventListener('mouseenter', () => {
            this.animateSkiller7Project();
        });

        skiller7Project.addEventListener('mouseleave', () => {
            this.resetSkiller7Project();
        });
    }

    animateSkiller7Project() {
        const techItems = document.querySelectorAll('.tech-item');
        const codeSnippets = document.querySelectorAll('.code-snippet');
        
        // Animate tech items
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'techFloat 2s ease-in-out infinite';
                item.style.transform = 'scale(1.1)';
            }, index * 100);
        });

        // Show code snippets with typing effect
        codeSnippets.forEach((snippet, index) => {
            setTimeout(() => {
                snippet.style.opacity = '1';
                snippet.style.transform = 'scale(1)';
                this.typeCodeSnippet(snippet);
            }, index * 200);
        });
    }

    resetSkiller7Project() {
        const techItems = document.querySelectorAll('.tech-item');
        const codeSnippets = document.querySelectorAll('.code-snippet');
        
        techItems.forEach(item => {
            item.style.transform = 'scale(1)';
        });

        codeSnippets.forEach(snippet => {
            snippet.style.opacity = '0';
            snippet.style.transform = 'scale(0.8)';
        });
    }

    addTechShowcaseEffects() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightTechItem(item);
            });

            item.addEventListener('mouseleave', () => {
                this.unhighlightTechItem(item);
            });
        });
    }

    highlightTechItem(item) {
        const tech = item.getAttribute('data-tech');
        const icon = item.querySelector('i');
        
        // Add pulsing effect
        icon.style.animation = 'techIconPulse 0.6s ease-in-out';
        
        // Add glow effect
        item.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
        
        // Show related code snippet
        this.showRelatedCode(tech);
    }

    unhighlightTechItem(item) {
        const icon = item.querySelector('i');
        icon.style.animation = '';
        item.style.boxShadow = '';
    }

    showRelatedCode(tech) {
        const codeSnippets = document.querySelectorAll('.code-snippet');
        
        codeSnippets.forEach(snippet => {
            if (snippet.classList.contains(`${tech}-code`)) {
                snippet.style.zIndex = '10';
                snippet.style.transform = 'scale(1.1)';
            } else {
                snippet.style.zIndex = '3';
                snippet.style.transform = 'scale(1)';
            }
        });
    }

    addCodeAnimationEffects() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                this.highlightCodeLine(line);
            });
        });
    }

    highlightCodeLine(line) {
        line.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        line.style.padding = '0.2rem 0.5rem';
        line.style.borderRadius = '5px';
        line.style.transition = 'all 0.3s ease';
    }

    addStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace('+', ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    typeCodeSnippet(snippet) {
        const lines = snippet.querySelectorAll('.code-line');
        
        lines.forEach((line, index) => {
            const originalText = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                this.typeText(line, originalText, 50);
            }, index * 300);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Interactive Skill Cards with Code Animation
class SkillCards {
    constructor() {
        this.init();
    }

    init() {
        this.addSkillInteractions();
        this.addCodeTypingEffect();
    }

    addSkillInteractions() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.animateSkillCard(e.target);
            });

            item.addEventListener('mouseleave', (e) => {
                this.resetSkillCard(e.target);
            });
        });
    }

    animateSkillCard(skillItem) {
        const skillType = skillItem.getAttribute('data-skill');
        const icon = skillItem.querySelector('i');
        
        // Add pulsing effect to icon
        if (icon) {
            icon.style.animation = 'skillIconPulse 0.6s ease-in-out';
        }

        // Add skill-specific effects
        switch(skillType) {
            case 'html':
                skillItem.style.borderColor = '#e34c26';
                break;
            case 'css':
                skillItem.style.borderColor = '#1572b6';
                break;
            case 'javascript':
                skillItem.style.borderColor = '#f7df1e';
                break;
            case 'responsive':
                skillItem.style.borderColor = '#61dafb';
                break;
        }
    }

    resetSkillCard(skillItem) {
        const icon = skillItem.querySelector('i');
        
        if (icon) {
            icon.style.animation = '';
        }
        
        skillItem.style.borderColor = '';
    }

    addCodeTypingEffect() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach((line, index) => {
            const originalText = line.textContent;
            line.textContent = '';
            
            // Add typing effect when code animation appears
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typeText(line, originalText, 50);
                    }
                });
            });
            
            observer.observe(line);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Portfolio Website Enhancements Class
class PortfolioWebsiteEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addPortfolioWebsiteInteractions();
        this.addTechShowcaseEffects();
        this.addCodeAnimationEffects();
        this.addStatsCounter();
    }

    addPortfolioWebsiteInteractions() {
        const portfolioWebsiteProject = document.querySelector('.portfolio-website-project');
        if (!portfolioWebsiteProject) return;

        portfolioWebsiteProject.addEventListener('mouseenter', () => {
            this.animatePortfolioWebsiteProject();
        });

        portfolioWebsiteProject.addEventListener('mouseleave', () => {
            this.resetPortfolioWebsiteProject();
        });

        // Add click effect
        portfolioWebsiteProject.addEventListener('click', (e) => {
            this.createRippleEffect(e, portfolioWebsiteProject);
        });

        // Add keyboard support
        portfolioWebsiteProject.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.createRippleEffect(e, portfolioWebsiteProject);
            }
        });
    }

    animatePortfolioWebsiteProject() {
        const project = document.querySelector('.portfolio-website-project');
        const logo = project.querySelector('.logo-icon');
        const stats = project.querySelectorAll('.stat-number');
        const overlay = project.querySelector('.portfolio-overlay');

        // Animate logo
        if (logo) {
            logo.style.animation = 'logoFloat 2s ease-in-out infinite';
        }

        // Animate stats
        stats.forEach(stat => {
            stat.style.transform = 'scale(1.1)';
            stat.style.textShadow = '0 0 15px rgba(102, 126, 234, 0.8)';
        });

        // Show overlay with delay
        setTimeout(() => {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.transform = 'translateY(0) scale(1)';
            }
        }, 200);
    }

    resetPortfolioWebsiteProject() {
        const project = document.querySelector('.portfolio-website-project');
        const logo = project.querySelector('.logo-icon');
        const stats = project.querySelectorAll('.stat-number');
        const overlay = project.querySelector('.portfolio-overlay');

        // Reset logo
        if (logo) {
            logo.style.animation = 'none';
        }

        // Reset stats
        stats.forEach(stat => {
            stat.style.transform = 'scale(1)';
            stat.style.textShadow = 'none';
        });

        // Hide overlay
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.style.transform = 'translateY(30px) scale(0.9)';
        }
    }

    addTechShowcaseEffects() {
        const techItems = document.querySelectorAll('.portfolio-website-project .tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightTechItem(item);
            });

            item.addEventListener('mouseleave', () => {
                this.resetTechItem(item);
            });
        });
    }

    highlightTechItem(item) {
        const tech = item.getAttribute('data-tech');
        
        // Add glow effect
        item.style.transform = 'scale(1.2)';
        item.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
        item.style.animation = 'techIconPulse 0.6s ease-in-out';
        
        // Show related code
        this.showRelatedCode(tech);
    }

    resetTechItem(item) {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
        item.style.animation = 'none';
    }

    showRelatedCode(tech) {
        const codeSnippets = document.querySelectorAll('.portfolio-website-project .code-snippet');
        
        codeSnippets.forEach(snippet => {
            snippet.style.zIndex = '2';
            snippet.style.transform = 'scale(0.8) rotate(1deg)';
        });

        // Highlight specific code based on tech
        const specificCode = document.querySelector(`.portfolio-website-project .${tech}-code`);
        if (specificCode) {
            specificCode.style.zIndex = '10';
            specificCode.style.transform = 'scale(1) rotate(0deg)';
            specificCode.style.opacity = '0.9';
        }
    }

    addCodeAnimationEffects() {
        const codeLines = document.querySelectorAll('.portfolio-website-project .code-line');
        
        codeLines.forEach((line, index) => {
            line.addEventListener('mouseenter', () => {
                line.style.color = '#667eea';
                line.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.8)';
                line.style.transform = 'translateX(10px)';
            });

            line.addEventListener('mouseleave', () => {
                line.style.color = '';
                line.style.textShadow = '';
                line.style.transform = 'translateX(0)';
            });
        });
    }

    addStatsCounter() {
        const statNumbers = document.querySelectorAll('.portfolio-website-project .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const isFPS = text.includes('fps');
        
        if (isPercentage) {
            this.countToNumber(element, 100, '%', 2000);
        } else if (isFPS) {
            this.countToNumber(element, 60, 'fps', 1500);
        }
    }

    countToNumber(element, target, suffix, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
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
            background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Landing Page Project Enhanced Interactions
class LandingPageProjectEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addLandingPageInteractions();
        this.addTechShowcaseEffects();
        this.addCodeAnimationEffects();
        this.addStatsCounter();
    }

    addLandingPageInteractions() {
        const landingPageProject = document.querySelector('.landing-page-project');
        if (!landingPageProject) return;

        landingPageProject.addEventListener('mouseenter', () => {
            this.animateLandingPageProject();
        });

        landingPageProject.addEventListener('mouseleave', () => {
            this.resetLandingPageProject();
        });

        // Add click effect
        landingPageProject.addEventListener('click', (e) => {
            this.createRippleEffect(e, landingPageProject);
        });

        // Add keyboard support
        landingPageProject.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.createRippleEffect(e, landingPageProject);
            }
        });
    }

    animateLandingPageProject() {
        const project = document.querySelector('.landing-page-project');
        const logo = project.querySelector('.logo-icon');
        const stats = project.querySelectorAll('.stat-number');
        const overlay = project.querySelector('.portfolio-overlay');

        // Animate logo with enhanced rocket effect
        if (logo) {
            logo.style.animation = 'rocketFloat 2s ease-in-out infinite';
            logo.style.filter = 'drop-shadow(0 0 20px rgba(255, 107, 107, 1.2))';
        }

        // Animate stats with conversion-focused effects
        stats.forEach(stat => {
            stat.style.transform = 'scale(1.15)';
            stat.style.textShadow = '0 0 20px rgba(255, 255, 255, 1)';
            stat.style.color = '#ffeb3b';
        });

        // Show overlay with enhanced delay
        setTimeout(() => {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.transform = 'translateY(0) scale(1)';
            }
        }, 300);
    }

    resetLandingPageProject() {
        const project = document.querySelector('.landing-page-project');
        const logo = project.querySelector('.logo-icon');
        const stats = project.querySelectorAll('.stat-number');
        const overlay = project.querySelector('.portfolio-overlay');

        // Reset logo
        if (logo) {
            logo.style.animation = 'rocketFloat 3s ease-in-out infinite';
            logo.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.8))';
        }

        // Reset stats
        stats.forEach(stat => {
            stat.style.transform = 'scale(1)';
            stat.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
            stat.style.color = '#ffffff';
        });

        // Hide overlay
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.style.transform = 'translateY(30px) scale(0.9)';
        }
    }

    addTechShowcaseEffects() {
        const techItems = document.querySelectorAll('.landing-page-project .tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightTechItem(item);
            });

            item.addEventListener('mouseleave', () => {
                this.resetTechItem(item);
            });
        });
    }

    highlightTechItem(item) {
        const tech = item.getAttribute('data-tech');
        
        // Add enhanced glow effect for landing page tech
        item.style.transform = 'scale(1.3) rotate(5deg)';
        item.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.9)';
        item.style.animation = 'techIconPulse 0.5s ease-in-out';
        item.style.background = 'rgba(255, 255, 255, 0.3)';
        
        // Show related code with enhanced effect
        this.showRelatedCode(tech);
    }

    resetTechItem(item) {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
        item.style.animation = 'techFloat 2s ease-in-out infinite';
        item.style.background = 'rgba(255, 255, 255, 0.2)';
    }

    showRelatedCode(tech) {
        const codeSnippets = document.querySelectorAll('.landing-page-project .code-snippet');
        
        codeSnippets.forEach(snippet => {
            snippet.style.zIndex = '2';
            snippet.style.transform = 'scale(0.8) rotate(2deg)';
            snippet.style.opacity = '0.1';
        });

        // Highlight specific code based on tech with enhanced effect
        const specificCode = document.querySelector(`.landing-page-project .${tech}-code`);
        if (specificCode) {
            specificCode.style.zIndex = '15';
            specificCode.style.transform = 'scale(1.1) rotate(0deg)';
            specificCode.style.opacity = '0.9';
            specificCode.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.4)';
            specificCode.style.border = '2px solid rgba(0, 255, 136, 0.6)';
        }
    }

    addCodeAnimationEffects() {
        const codeLines = document.querySelectorAll('.landing-page-project .code-line');
        
        codeLines.forEach((line, index) => {
            line.addEventListener('mouseenter', () => {
                line.style.color = '#00ff88';
                line.style.textShadow = '0 0 15px rgba(0, 255, 136, 1)';
                line.style.transform = 'translateX(15px) scale(1.05)';
                line.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
                line.style.padding = '0.3rem 0.8rem';
                line.style.borderRadius = '8px';
                line.style.border = '1px solid rgba(0, 255, 136, 0.4)';
            });

            line.addEventListener('mouseleave', () => {
                line.style.color = '#00ff88';
                line.style.textShadow = '0 0 5px rgba(0, 255, 136, 0.5)';
                line.style.transform = 'translateX(0) scale(1)';
                line.style.backgroundColor = 'transparent';
                line.style.padding = '0.2rem 0';
                line.style.borderRadius = '0';
                line.style.border = 'none';
            });
        });
    }

    addStatsCounter() {
        const statNumbers = document.querySelectorAll('.landing-page-project .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const isTime = text.includes('s');
        
        if (isPercentage) {
            this.countToNumber(element, 95, '%', 2500);
        } else if (isTime) {
            this.countToNumber(element, 2.3, 's', 2000);
        }
    }

    countToNumber(element, target, suffix, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix === 's') {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
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
            background: radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
}

// Enhanced Landing Page (Hero) Enhancements Class
class LandingPageEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addHeroAnimations();
        this.addFloatingCardInteractions();
        this.addStatsCounter();
        this.addParticleSystem();
        this.addButtonEffects();
        this.addScrollEffects();
        this.addBackgroundEffects();
        this.addGridInteractions();
        this.addScrollIndicator();
    }

    addHeroAnimations() {
        // Staggered animation for hero elements
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-buttons');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    addFloatingCardInteractions() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            // Add random delay for more natural movement
            const randomDelay = Math.random() * 2;
            card.style.animationDelay = `${randomDelay}s`;
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
            
            // Click effects
            card.addEventListener('click', (e) => {
                this.createCardRipple(e, card);
            });
        });
    }

    animateCardHover(card) {
        const icon = card.querySelector('i');
        const glow = card.querySelector('.card-glow');
        const trail = card.querySelector('.card-trail');
        
        // Scale and rotate card
        card.style.transform = 'scale(1.15) rotate(10deg)';
        card.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.6)';
        
        // Animate icon
        if (icon) {
            icon.style.transform = 'scale(1.3) rotate(-15deg)';
            icon.style.color = '#FFD700';
        }
        
        // Show glow effect
        if (glow) {
            glow.style.opacity = '0.8';
            glow.style.animation = 'cardGlowPulse 1s ease-in-out infinite';
        }
        
        // Show trail effect
        if (trail) {
            trail.style.width = '200%';
            trail.style.height = '200%';
            trail.style.opacity = '1';
            trail.style.animation = 'trailRotate 2s linear infinite';
        }
        
        // Add pulsing border
        card.style.borderColor = 'rgba(255, 215, 0, 0.8)';
        card.style.borderWidth = '4px';
    }

    resetCardHover(card) {
        const icon = card.querySelector('i');
        const glow = card.querySelector('.card-glow');
        const trail = card.querySelector('.card-trail');
        
        // Reset card
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
        card.style.borderWidth = '';
        
        // Reset icon
        if (icon) {
            icon.style.transform = '';
            icon.style.color = '';
        }
        
        // Hide glow effect
        if (glow) {
            glow.style.opacity = '0';
            glow.style.animation = '';
        }
        
        // Hide trail effect
        if (trail) {
            trail.style.width = '0';
            trail.style.height = '0';
            trail.style.opacity = '0';
            trail.style.animation = '';
        }
    }

    createCardRipple(event, card) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateStatCounter(element) {
        const text = element.textContent;
        
        if (text.includes('50+')) {
            this.countToNumber(element, 50, '+', 2000);
        } else if (text.includes('100%')) {
            this.countToNumber(element, 100, '%', 2000);
        } else if (text.includes('24/7')) {
            // Special case for 24/7 - just animate the element
            element.style.transform = 'scale(1.2)';
            element.style.color = '#FFD700';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 1000);
        }
    }

    countToNumber(element, target, suffix, duration) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    addParticleSystem() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;
        
        // Create additional particles dynamically
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    addButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Enhanced hover effects
            button.addEventListener('mouseenter', () => {
                this.animateButtonHover(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.resetButtonHover(button);
            });
            
            // Click effects
            button.addEventListener('click', (e) => {
                this.createButtonRipple(e, button);
            });
        });
    }

    animateButtonHover(button) {
        const icon = button.querySelector('.btn-icon');
        const glow = button.querySelector('.btn-glow');
        
        button.style.transform = 'translateY(-3px) scale(1.05)';
        
        if (icon) {
            icon.style.transform = 'translateX(8px) scale(1.1)';
        }
        
        if (glow) {
            glow.style.width = '200%';
            glow.style.height = '200%';
            glow.style.opacity = '1';
        }
        
        // Add glow effect
        if (button.classList.contains('btn-primary')) {
            button.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.6)';
        } else if (button.classList.contains('btn-secondary')) {
            button.style.boxShadow = '0 15px 35px rgba(0, 255, 255, 0.4)';
        }
    }

    resetButtonHover(button) {
        const icon = button.querySelector('.btn-icon');
        const glow = button.querySelector('.btn-glow');
        
        button.style.transform = '';
        button.style.boxShadow = '';
        
        if (icon) {
            icon.style.transform = '';
        }
        
        if (glow) {
            glow.style.width = '0';
            glow.style.height = '0';
            glow.style.opacity = '0';
        }
    }

    createButtonRipple(event, button) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addBackgroundEffects() {
        // Add mouse tracking for cosmic rings
        const rings = document.querySelectorAll('.ring');
        const shapes = document.querySelectorAll('.shape');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            rings.forEach((ring, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                ring.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                const x = (mouseX - 0.5) * speed * 10;
                const y = (mouseY - 0.5) * speed * 10;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    addGridInteractions() {
        const gridLines = document.querySelectorAll('.grid-line');
        
        gridLines.forEach((line, index) => {
            // Add hover effects to grid lines
            line.addEventListener('mouseenter', () => {
                line.style.opacity = '0.5';
                line.style.transform = 'scaleX(1.2)';
            });
            
            line.addEventListener('mouseleave', () => {
                line.style.opacity = '0.1';
                line.style.transform = 'scaleX(1)';
            });
        });
    }

    addScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const scrollText = document.querySelector('.scroll-text');
        
        if (!scrollIndicator) return;
        
        // Add click functionality to scroll indicator
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        // Add hover effects
        scrollIndicator.addEventListener('mouseenter', () => {
            scrollIndicator.style.transform = 'translateX(-50%) scale(1.1)';
            if (scrollText) {
                scrollText.style.opacity = '1';
                scrollText.style.transform = 'translateY(-5px)';
            }
        });
        
        scrollIndicator.addEventListener('mouseleave', () => {
            scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
            if (scrollText) {
                scrollText.style.opacity = '0.7';
                scrollText.style.transform = 'translateY(0px)';
            }
        });
    }

    addScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            // Parallax effect for floating cards
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                card.style.transform = `translateY(${parallax * speed}px)`;
            });
            
            // Parallax effect for particles
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = 0.05 + (index * 0.02);
                particle.style.transform = `translateY(${parallax * speed}px)`;
            });
            
            // Parallax effect for background elements
            const rings = document.querySelectorAll('.ring');
            rings.forEach((ring, index) => {
                const speed = 0.02 + (index * 0.01);
                ring.style.transform = `translate(-50%, calc(-50% + ${parallax * speed}px))`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroEnhancements();
    new PortfolioEnhancements();
    new EcommerceEnhancements();
    new Skiller7Enhancements();
    new SkillCards();
    new Interactive3D();
    new SmoothScroll();
    new NavbarScroll();
    new MobileMenu();
    new ScrollAnimations();
    new ParallaxEffect();
    new ContactForm();
    new ScrollProgress();
    new LandingPageEnhancements();
    new PortfolioWebsiteEnhancements();
    new LandingPageProjectEnhancements();
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(100%);
            }
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});