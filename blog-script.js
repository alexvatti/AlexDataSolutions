// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
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

// Reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(
            Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
            1
        );
        
        progressBarFill.style.width = `${progress * 100}%`;
    });
}

// Copy code functionality
function addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        
        block.appendChild(button);
        
        button.addEventListener('click', () => {
            const code = block.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = code.textContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    });
}

// Fade in animation for content sections
function setupFadeInAnimations() {
    const sections = document.querySelectorAll('.content-section');
    const cards = document.querySelectorAll('.concept-card, .flow-step, .result-card, .use-case-card, .tip-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe all cards with a slight delay for staggered effect
    cards.forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 50);
    });
}

// Social sharing functionality
function addSocialSharing() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'social-share';
    shareContainer.innerHTML = `
        <div style="margin: 3rem 0; padding: 2rem; border: 2px solid #000; border-radius: 1rem; text-align: center; background: #fff;">
            <h3 style="margin: 0 0 1.5rem; color: #000; font-size: 1.5rem;">Share This Article</h3>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="share-btn twitter" data-platform="twitter" style="padding: 0.75rem 1.5rem; border: 2px solid #000; border-radius: 2rem; background: #fff; color: #000; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Twitter</button>
                <button class="share-btn linkedin" data-platform="linkedin" style="padding: 0.75rem 1.5rem; border: 2px solid #000; border-radius: 2rem; background: #fff; color: #000; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">LinkedIn</button>
                <button class="share-btn copy-link" data-platform="copy" style="padding: 0.75rem 1.5rem; border: 2px solid #000; border-radius: 2rem; background: #fff; color: #000; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Copy Link</button>
            </div>
        </div>
    `;
    
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.parentNode.insertBefore(shareContainer, ctaSection);
    }
    
    // Add hover effects
    const shareButtons = shareContainer.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#000';
            btn.style.color = '#fff';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#fff';
            btn.style.color = '#000';
        });
    });
    
    // Add click handlers
    shareContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('share-btn')) {
            const platform = e.target.dataset.platform;
            const url = window.location.href;
            const title = document.title;
            
            switch (platform) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(() => {
                        e.target.textContent = 'Copied!';
                        setTimeout(() => {
                            e.target.textContent = 'Copy Link';
                        }, 2000);
                    }).catch(() => {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = url;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        
                        e.target.textContent = 'Copied!';
                        setTimeout(() => {
                            e.target.textContent = 'Copy Link';
                        }, 2000);
                    });
                    break;
            }
        }
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Enhanced scroll animations
function enhanceScrollAnimations() {
    const elements = document.querySelectorAll('.flow-step, .result-card, .concept-card, .use-case-card');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    createReadingProgress();
    addCodeCopyButtons();
    setupFadeInAnimations();
    addSocialSharing();
    setupLazyLoading();
    enhanceScrollAnimations();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const activeElements = document.querySelectorAll('.active, .open');
        activeElements.forEach(el => {
            el.classList.remove('active', 'open');
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

console.log('GenAI-RAG Blog loaded successfully!');
console.log('Features:');
console.log('- Reading progress indicator');
console.log('- Code copy functionality');
console.log('- Smooth scroll animations');
console.log('- Social sharing buttons');
console.log('- Responsive design');
console.log('- Performance optimized');