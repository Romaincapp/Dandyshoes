// Navbar scrolling effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(18, 18, 18, 0.9)';
        navbar.style.padding = '1rem 2rem';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.8)';
        navbar.style.padding = '1.5rem 2rem';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Audio player simulation - optimized
const playBtn = document.querySelector('.play-btn');
let isPlaying = false;
let animationFrame;

if (playBtn) {
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
                </svg>
            `;
            animateProgressBar();
        } else {
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            // Cancel animation when paused
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        }
    });
}

// Optimized progress bar animation using requestAnimationFrame
const progressBar = document.querySelector('.progress-bar');
let width = 30;

function animateProgressBar() {
    if (!isPlaying) return;
    
    width += 0.1;
    if (width >= 100) {
        width = 0;
        // Auto-reset player when track finishes
        isPlaying = false;
        if (playBtn) {
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
        }
        return;
    }
    
    if (progressBar) {
        progressBar.style.width = width + '%';
    }
    
    animationFrame = requestAnimationFrame(animateProgressBar);
}

// Logo mouse/touch follow effect
const logo = document.querySelector('.logo');

if (logo) {
    // Set initial transform style to enable smooth transitions
    logo.style.transition = 'transform 0.1s ease-out';
    
    // Mouse move effect (desktop)
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Apply transform based on mouse position
        logo.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) translateZ(10px)`;
    });
    
    // Touch move effect (mobile)
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const x = touch.clientX / window.innerWidth - 0.5;
            const y = touch.clientY / window.innerHeight - 0.5;
            
            // Apply transform based on touch position
            logo.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) translateZ(10px)`;
        }
    });
    
    // Reset position when not interacting
    document.addEventListener('mouseleave', resetLogoPosition);
    document.addEventListener('touchend', resetLogoPosition);
    
    function resetLogoPosition() {
        logo.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
}

// 3D tilt effect for cards
const cards = document.querySelectorAll('.hover-3d');

cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width * 100;
        const yPercent = y / rect.height * 100;
        
        const tiltX = (yPercent - 50) / 10;
        const tiltY = -(xPercent - 50) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .glass-card, .tour-date, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
document.querySelectorAll('.section-title, .glass-card, .tour-date, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs obligatoires (nom, email, message).');
            return;
        }
        
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form and show success message
        this.reset();
        alert('Merci pour votre message ! Nous vous répondrons très bientôt.');
    });
}

// Ticket button functionality - amélioré
const ticketButtons = document.querySelectorAll('.tickets-btn');
ticketButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent === 'Complet') {
            alert('Désolé, ce concert est complet !');
        } else if (this.textContent === 'Itinéraire') {
            // Ne rien faire, laisser le lien fonctionner normalement pour rediriger vers Google Maps
            return true;
        } else {
            alert('Vous allez être redirigé vers googlemaps.');
            // Here you would redirect to a ticketing system
        }
    });
});

// Read More / Read Less Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const hiddenContent = document.getElementById('hiddenContent');
    
    if(readMoreBtn && hiddenContent) {
        // Assurons-nous que le bouton est visible et que le contenu est caché initialement
        hiddenContent.classList.remove('visible');
        
        readMoreBtn.addEventListener('click', function() {
            hiddenContent.classList.toggle('visible');
            
            if (hiddenContent.classList.contains('visible')) {
                readMoreBtn.textContent = 'Voir moins';
            } else {
                readMoreBtn.textContent = 'Voir plus';
                
                // Scroll back to the about section if needed
                const aboutSection = document.getElementById('about');
                if(aboutSection) {
                    window.scrollTo({
                        top: aboutSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Improved Mobile Menu Handling
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        // Use event delegation for better performance
        document.addEventListener('click', function(event) {
            // Toggle menu when clicking the toggle button
            if (event.target.closest('#mobileMenuToggle')) {
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                event.stopPropagation();
            } 
            // Close menu when clicking a link 
            else if (event.target.closest('.nav-links a')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            } 
            // Close menu when clicking outside
            else if (navLinks.classList.contains('active') && 
                    !navLinks.contains(event.target) && 
                    !mobileMenuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Initialize animation on load to prevent FOUC (Flash of Unstyled Content)
    animateOnScroll();
});
