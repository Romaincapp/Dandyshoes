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

// Audio player simulation
const playBtn = document.querySelector('.play-btn');
let isPlaying = false;

playBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
            </svg>
        `;
    } else {
        playBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
    }
});

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

// Simulated progress bar animation for the audio player
const progressBar = document.querySelector('.progress-bar');
let width = 30;
const interval = setInterval(() => {
    if (isPlaying) {
        width += 0.1;
        if (width >= 100) {
            width = 0;
        }
        progressBar.style.width = width + '%';
    }
}, 100);

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

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset form and show success message
        this.reset();
        alert('Merci pour votre message ! Nous vous répondrons très bientôt.');
    });
}

// Ticket button functionality
const ticketButtons = document.querySelectorAll('.tickets-btn');
ticketButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent === 'Complet') {
            alert('Désolé, ce concert est complet !');
        } else {
            alert('Vous allez être redirigé vers notre billetterie.');
            // Here you would redirect to a ticketing system
        }
    });
});
