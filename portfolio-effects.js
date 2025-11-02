// Enhanced Portfolio Background Effects Class
class PortfolioBackgroundEffects {
    constructor() {
        this.init();
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }

    init() {
        // Disable heavy portfolio effects on mobile for performance
        if (this.isMobile()) {
            return;
        }
        
        this.addPortfolioBackgroundInteractions();
        this.addPortfolioMouseTracking();
        this.addPortfolioScrollEffects();
    }

    addPortfolioBackgroundInteractions() {
        const portfolioRings = document.querySelectorAll('.portfolio-ring');
        const portfolioShapes = document.querySelectorAll('.portfolio-shape');
        
        // Add hover effects to rings
        portfolioRings.forEach((ring, index) => {
            ring.addEventListener('mouseenter', () => {
                this.animatePortfolioRing(ring, index);
            });
            
            ring.addEventListener('mouseleave', () => {
                this.resetPortfolioRing(ring);
            });
        });
        
        // Add hover effects to shapes
        portfolioShapes.forEach((shape, index) => {
            shape.addEventListener('mouseenter', () => {
                this.animatePortfolioShape(shape, index);
            });
            
            shape.addEventListener('mouseleave', () => {
                this.resetPortfolioShape(shape);
            });
        });
    }

    animatePortfolioRing(ring, index) {
        const speedMultiplier = 1 + (index * 0.5);
        ring.style.animationDuration = `${20 / speedMultiplier}s`;
        ring.style.borderWidth = '3px';
        ring.style.filter = 'brightness(1.5)';
        
        // Add glow effect
        ring.style.boxShadow = `0 0 20px ${this.getRingColor(index)}`;
    }

    resetPortfolioRing(ring) {
        ring.style.animationDuration = '';
        ring.style.borderWidth = '2px';
        ring.style.filter = '';
        ring.style.boxShadow = '';
    }

    animatePortfolioShape(shape, index) {
        shape.style.transform = 'scale(1.5) rotate(180deg)';
        shape.style.filter = 'brightness(1.8)';
        shape.style.boxShadow = `0 0 15px ${this.getShapeColor(index)}`;
    }

    resetPortfolioShape(shape) {
        shape.style.transform = '';
        shape.style.filter = '';
        shape.style.boxShadow = '';
    }

    getRingColor(index) {
        const colors = [
            'rgba(255, 107, 107, 0.6)',
            'rgba(78, 205, 196, 0.6)',
            'rgba(102, 126, 234, 0.6)'
        ];
        return colors[index] || colors[0];
    }

    getShapeColor(index) {
        const colors = [
            'rgba(255, 107, 107, 0.6)',
            'rgba(78, 205, 196, 0.6)',
            'rgba(102, 126, 234, 0.6)',
            'rgba(255, 215, 0, 0.6)',
            'rgba(138, 43, 226, 0.6)',
            'rgba(0, 255, 255, 0.6)'
        ];
        return colors[index] || colors[0];
    }

    addPortfolioMouseTracking() {
        // Disable mouse tracking on mobile (no mouse on mobile devices)
        if (this.isMobile()) {
            return;
        }
        
        const portfolioRings = document.querySelectorAll('.portfolio-ring');
        const portfolioShapes = document.querySelectorAll('.portfolio-shape');
        
        let ticking = false;
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    // Only apply mouse tracking when hovering over portfolio section
                    const portfolioSection = document.querySelector('.portfolio');
                    if (!portfolioSection) {
                        ticking = false;
                        return;
                    }
                    
                    const rect = portfolioSection.getBoundingClientRect();
                    const isInPortfolio = e.clientX >= rect.left && e.clientX <= rect.right && 
                                        e.clientY >= rect.top && e.clientY <= rect.bottom;
                    
                    if (isInPortfolio) {
                        portfolioRings.forEach((ring, index) => {
                            const speed = (index + 1) * 0.3;
                            const x = (mouseX - 0.5) * speed * 15;
                            const y = (mouseY - 0.5) * speed * 15;
                            ring.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                        });
                        
                        portfolioShapes.forEach((shape, index) => {
                            const speed = (index + 1) * 0.2;
                            const x = (mouseX - 0.5) * speed * 8;
                            const y = (mouseY - 0.5) * speed * 8;
                            shape.style.transform = `translate(${x}px, ${y}px)`;
                        });
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    addPortfolioScrollEffects() {
        // Already disabled on mobile in init, but extra safety
        if (this.isMobile()) {
            return;
        }
        
        let ticking = false;
        
        const updatePortfolioScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const portfolioSection = document.querySelector('.portfolio');
            
            if (!portfolioSection) return;
            
            const rect = portfolioSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const parallax = scrolled * 0.3;
                
                // Parallax effect for portfolio rings
                const portfolioRings = document.querySelectorAll('.portfolio-ring');
                portfolioRings.forEach((ring, index) => {
                    const speed = 0.01 + (index * 0.005);
                    ring.style.transform = `translate(-50%, calc(-50% + ${parallax * speed}px))`;
                });
                
                // Parallax effect for portfolio shapes
                const portfolioShapes = document.querySelectorAll('.portfolio-shape');
                portfolioShapes.forEach((shape, index) => {
                    const speed = 0.008 + (index * 0.003);
                    shape.style.transform = `translateY(${parallax * speed}px)`;
                });
                
                // Parallax effect for portfolio particles
                const portfolioParticles = document.querySelectorAll('.portfolio-particle');
                portfolioParticles.forEach((particle, index) => {
                    const speed = 0.005 + (index * 0.002);
                    particle.style.transform = `translateY(${parallax * speed}px)`;
                });
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updatePortfolioScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
}

// Initialize Portfolio Background Effects
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioBackgroundEffects();
});
