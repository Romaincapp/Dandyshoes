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

// Toggle dates 2025
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle2025Dates');
    const dates2025 = document.getElementById('dates2025');
    const toggleIcon = document.getElementById('toggleIcon');

    if (toggleBtn && dates2025) {
        toggleBtn.addEventListener('click', function() {
            if (dates2025.style.display === 'none') {
                dates2025.style.display = 'block';
                toggleIcon.innerHTML = '&#9650;';
                toggleBtn.style.background = 'rgba(255, 60, 60, 0.2)';
            } else {
                dates2025.style.display = 'none';
                toggleIcon.innerHTML = '&#9660;';
                toggleBtn.style.background = 'rgba(40, 40, 40, 0.8)';
            }
        });

        // Hover effect
        toggleBtn.addEventListener('mouseenter', function() {
            toggleBtn.style.background = 'rgba(255, 60, 60, 0.15)';
        });
        toggleBtn.addEventListener('mouseleave', function() {
            if (dates2025.style.display === 'none') {
                toggleBtn.style.background = 'rgba(40, 40, 40, 0.8)';
            } else {
                toggleBtn.style.background = 'rgba(255, 60, 60, 0.2)';
            }
        });
    }

    // Release banner hover effect
    const releaseBanner = document.querySelector('.release-banner');
    if (releaseBanner) {
        const bannerBox = releaseBanner.querySelector('div');
        releaseBanner.addEventListener('mouseenter', function() {
            bannerBox.style.transform = 'scale(1.03)';
            bannerBox.style.borderColor = '#ff6060';
            bannerBox.style.boxShadow = '0 0 40px rgba(255, 60, 60, 0.5), inset 0 0 30px rgba(255, 60, 60, 0.1)';
            bannerBox.style.transition = 'all 0.3s ease';
        });
        releaseBanner.addEventListener('mouseleave', function() {
            bannerBox.style.transform = 'scale(1)';
            bannerBox.style.borderColor = '#ff3c3c';
            bannerBox.style.boxShadow = '0 0 30px rgba(255, 60, 60, 0.3), inset 0 0 20px rgba(255, 60, 60, 0.05)';
        });
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
    if (!audioElement) return;
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
                readMoreBtn.textContent = 'Show less';
            } else {
                readMoreBtn.textContent = 'See more';

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
// Fonction pour ajouter un événement au calendrier
function addToCalendar(eventData) {
    const { title, location, venue, date, startTime = '20:00', endTime = '23:00' } = eventData;
    
    // Formatage de la date pour les différents calendriers
    const eventDate = new Date(date);
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);
    
    // Format pour Google Calendar (YYYYMMDDTHHMMSS)
    const formatDateForGoogle = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    // URLs pour différents calendriers
    const calendarUrls = {
        google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateForGoogle(startDateTime)}/${formatDateForGoogle(endDateTime)}&details=${encodeURIComponent(`Concert de DANDYSHOES à ${venue}`)}&location=${encodeURIComponent(`${venue}, ${location}`)}&sf=true&output=xml`,
        
        outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDateTime.toISOString()}&enddt=${endDateTime.toISOString()}&body=${encodeURIComponent(`Concert de DANDYSHOES à ${venue}`)}&location=${encodeURIComponent(`${venue}, ${location}`)}`,
        
        // Format ICS pour Apple Calendar et autres
        ics: generateICSFile(title, startDateTime, endDateTime, `${venue}, ${location}`, `Concert de DANDYSHOES à ${venue}`)
    };
    
    // Créer le menu de sélection
    showCalendarMenu(calendarUrls);
}

// Générer un fichier ICS
function generateICSFile(title, startDate, endDate, location, description) {
    const formatDateForICS = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DANDYSHOES//NONSGML Events//EN
BEGIN:VEVENT
UID:${Date.now()}@dandyshoes.be
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    return URL.createObjectURL(blob);
}

// Afficher le menu de sélection du calendrier
function showCalendarMenu(urls) {
    // Supprimer le menu existant s'il y en a un
    const existingMenu = document.querySelector('.calendar-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Créer le menu
    const menu = document.createElement('div');
    menu.className = 'calendar-menu';
    menu.innerHTML = `
        <div class="calendar-menu-content">
            <h4>Ajouter à votre calendrier</h4>
            <div class="calendar-options">
                <a href="${urls.google}" target="_blank" class="calendar-option">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google Calendar
                </a>
                <a href="${urls.outlook}" target="_blank" class="calendar-option">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#0078D4" d="M21.53 4.31c.7.37 1.15 1.07 1.15 1.92v11.54c0 .85-.45 1.55-1.15 1.92l-8.33-7.69 8.33-7.69z"/>
                        <path fill="#0078D4" d="M20.84 2.38c.39.2.69.55.69.93v1l-8.33 7.69L4.87 4.31c.7-.37 1.58-.37 2.28 0l13.69 7.69V4.31z"/>
                        <path fill="#40E0D0" d="M1.31 4.31c-.7.37-1.15 1.07-1.15 1.92v11.54c0 .85.45 1.55 1.15 1.92l8.33-7.69-8.33-7.69z"/>
                    </svg>
                    Outlook
                </a>
                <a href="${urls.ics}" download="dandyshoes-concert.ics" class="calendar-option">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#666" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    Télécharger (.ics)
                </a>
            </div>
            <button class="calendar-close" onclick="this.closest('.calendar-menu').remove()">×</button>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(menu);
    
    // Animer l'apparition
    setTimeout(() => menu.classList.add('active'), 10);
    
    // Fermer en cliquant à l'extérieur
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            menu.remove();
        }
    });
}

// Initialiser les boutons d'ajout au calendrier
document.addEventListener('DOMContentLoaded', function() {
    // Données des concerts (à adapter selon vos dates)
    const concerts = [
        {
            title: "DANDYSHOES - EP DIURNE Release Party",
            location: "Le Belvédère, Belgium",
            venue: "Le Belvédère",
            date: "2026-02-20",
            startTime: "20:00",
            endTime: "23:00"
        },
        {
            title: "DANDYSHOES - Cercle Saint-Charles",
            location: "Charleroi, Belgium",
            venue: "Cercle Saint-Charles",
            date: "2025-05-23",
            startTime: "20:00",
            endTime: "23:00"
        },
        {
            title: "DANDYSHOES - Nouille Stock Festival",
            location: "Senzeilles, Belgium", 
            venue: "Nouille Stock Festival",
            date: "2025-05-31",
            startTime: "19:00",
            endTime: "22:00"
        },
        {
            title: "DANDYSHOES - Les 3 Auvergniats",
            location: "Beaumont, Belgium",
            venue: "Les 3 Auvergniats", 
            date: "2025-06-13",
            startTime: "20:00",
            endTime: "23:00"
        },
        {
            title: "DANDYSHOES - Chop'n'Rock",
            location: "Sedan, France",
            venue: "Chop'n'Rock",
            date: "2025-07-18", 
            startTime: "20:00",
            endTime: "23:00"
        },
        {
            title: "DANDYSHOES - Private Showcase",
            location: "Surprise Location",
            venue: "Private Showcase",
            date: "2025-08-23",
            startTime: "20:00", 
            endTime: "23:00"
        }
    ];
    
    // Ajouter les boutons après le chargement de la page
    const tourDates = document.querySelectorAll('.tour-date');
    tourDates.forEach((tourDate, index) => {
        if (concerts[index]) {
            const ticketsBtn = tourDate.querySelector('.tickets-btn');
            if (ticketsBtn) {
                // Créer le bouton d'ajout au calendrier
                const calendarBtn = document.createElement('button');
                calendarBtn.className = 'calendar-btn';
                calendarBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    Agenda
                `;
                
                // Ajouter l'événement click
                calendarBtn.addEventListener('click', () => {
                    addToCalendar(concerts[index]);
                });
                
                // Insérer le bouton après le bouton "Go!"
                ticketsBtn.parentNode.insertBefore(calendarBtn, ticketsBtn.nextSibling);
            }
        }
    });
});

// Modal pour agrandir les images des membres
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('memberModal');
    const modalImg = document.getElementById('memberModalImg');
    const modalCaption = document.getElementById('memberModalCaption');
    const closeBtn = document.querySelector('.member-modal-close');
    const memberCards = document.querySelectorAll('.member-card');

    // Ouvrir la modale au clic sur une carte
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.member-img');
            const memberName = this.querySelector('strong').textContent;
            const memberRole = this.querySelector('span').textContent;

            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.innerHTML = `<strong>${memberName}</strong> - ${memberRole}`;
        });
    });

    // Fermer la modale
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Fermer au clic en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});