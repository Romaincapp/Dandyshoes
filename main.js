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

// Code du lecteur audio - ajoutez ceci à votre fichier main.js
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du lecteur audio
    const audioElement = document.getElementById('audioPlayer');
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const timeDisplay = document.querySelectorAll('.time-display span');
    const prevBtn = document.querySelector('.control-btn:first-child');
    const nextBtn = document.querySelector('.control-btn:last-child');
    
    // Playlist (liste des morceaux)
    const playlist = [
        {
            title: "Thunder",
            file: "audio/thunder.mp3"
        },
        {
            title: "All About Love",
            file: "audio/all_about_love.mp3"
        },
        // Ajoutez d'autres morceaux selon vos besoins
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    
    // Charger un morceau
    function loadTrack(trackIndex) {
        if (trackIndex >= 0 && trackIndex < playlist.length) {
            currentTrack = trackIndex;
            audioElement.src = playlist[trackIndex].file;
            audioElement.load();
            
            // Mettre à jour le titre si nécessaire
            const titleElement = document.querySelector('.neon-text');
            if (titleElement) {
                titleElement.textContent = '"' + playlist[trackIndex].title + '"';
            }
            
            if (isPlaying) {
                audioElement.play()
                    .then(() => {
                        // Lecture démarrée avec succès
                    })
                    .catch(error => {
                        console.error('Erreur lors de la lecture:', error);
                        isPlaying = false;
                        updatePlayButton();
                    });
            }
            
            // Réinitialiser la barre de progression
            progressBar.style.width = "0%";
        }
    }
    
    // Mettre à jour le bouton play/pause
    function updatePlayButton() {
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
    }
    
    // Fonction play/pause
    function togglePlay() {
        if (audioElement.paused) {
            audioElement.play()
                .then(() => {
                    isPlaying = true;
                    updatePlayButton();
                })
                .catch(error => {
                    console.error('Erreur lors de la lecture:', error);
                });
        } else {
            audioElement.pause();
            isPlaying = false;
            updatePlayButton();
        }
    }
    
    // Format du temps (secondes -> MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }
    
    // Événements du lecteur audio
    
    // Mise à jour de la progression
    audioElement.addEventListener('timeupdate', function() {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = percent + '%';
        
        // Mise à jour de l'affichage du temps
        timeDisplay[0].textContent = formatTime(audioElement.currentTime);
    });
    
    // Quand les métadonnées sont chargées
    audioElement.addEventListener('loadedmetadata', function() {
        timeDisplay[1].textContent = formatTime(audioElement.duration);
    });
    
    // Quand un morceau se termine
    audioElement.addEventListener('ended', function() {
        // Passer au morceau suivant
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
    });
    
    // Clic sur la barre de progression
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            const seekTime = clickPosition * audioElement.duration;
            audioElement.currentTime = seekTime;
        });
    }
    
    // Bouton précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
        });
    }
    
    // Bouton suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
        });
    }
    
    // Bouton play/pause
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }
    
    // Initialiser le lecteur avec le premier morceau
    loadTrack(currentTrack);
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
                readMoreBtn.textContent = 'Read more';
            } else {
                readMoreBtn.textContent = 'Show less';
                
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

// Audio/Video configuration
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Conserve la valeur de muted définie dans le HTML
        // Ne pas modifier video.muted ici
        
        // Note: Many browsers require user interaction before allowing autoplay with sound
        video.addEventListener('canplay', function() {
            if (video.autoplay) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Autoplay was prevented. User interaction required.');
                    });
                }
            }
        });
    });
});

// Add this code to handle streaming links to play local audio files

document.addEventListener('DOMContentLoaded', function() {
    // Get audio player element
    const audioPlayer = document.getElementById('audioPlayer');
    
    // Get all streaming links in the release info section
    const streamingLinks = document.querySelectorAll('.streaming-links a');
    
    // Audio files mapping
    const audioFiles = {
        'spotify': 'audio/thunder.mp3',
        'apple': 'audio/all_about_love.mp3',
        'facebook': 'audio/have_a_dandy_day.mp3',
        'instagram': 'audio/thunder_acoustic.mp3',
        'youtube': 'audio/rock_n_roll.mp3'
    };
    
    // Set up click handlers for streaming icons
    streamingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is for local playback (has a data-play attribute) or external link
            const audioKey = this.getAttribute('data-play');
            
            if (audioKey && audioFiles[audioKey]) {
                e.preventDefault(); // Prevent the default navigation
                
                // Load and play the corresponding audio file
                audioPlayer.src = audioFiles[audioKey];
                audioPlayer.load();
                audioPlayer.play()
                    .then(() => {
                        // Update play button to pause
                        const playBtn = document.querySelector('.play-btn');
                        if (playBtn) {
                            playBtn.innerHTML = `
                                <svg viewBox="0 0 24 24">
                                    <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
                                </svg>
                            `;
                        }
                        
                        // Update track title if needed
                        const titleElement = document.querySelector('.neon-text');
                        if (titleElement) {
                            const trackName = audioKey.charAt(0).toUpperCase() + audioKey.slice(1);
                            titleElement.textContent = `"${trackName}"`;
                        }
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                    });
                
                return false;
            }
            // If no data-play attribute, let the link navigate normally
        });
    });
});
