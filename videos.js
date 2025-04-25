// video.js - Script for DandyShoes video section

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const modalClose = document.querySelector('.modal-close');
    const playButton = document.querySelector('.play-button');
    const videoCards = document.querySelectorAll('.video-card');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const sliderContainers = document.querySelectorAll('.slider-container');
    const prevArrows = document.querySelectorAll('.slider-arrow.prev');
    const nextArrows = document.querySelectorAll('.slider-arrow.next');
    
    // Play hero video
    if (playButton) {
        playButton.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            openVideoModal(videoSrc);
        });
    }
    
    // Play video from cards
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real implementation, you would get the video source from a data attribute
            // Here we're using a placeholder
            const videoSrc = 'videos/thunder.mp4'; // Replace with actual video source
            openVideoModal(videoSrc);
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterVideos(category);
        });
    });
    
    // Slider navigation
    prevArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            const container = sliderContainers[index];
            container.scrollLeft -= 330; // Card width + gap
        });
    });
    
    nextArrows.forEach((arrow, index) => {
        arrow.addEventListener('click', function() {
            const container = sliderContainers[index];
            container.scrollLeft += 330; // Card width + gap
        });
    });
    
    // Functions
    function openVideoModal(videoSrc) {
        if (videoSrc && videoPlayer) {
            // Set video source
            videoPlayer.src = videoSrc;
            
            // Show modal
            videoModal.classList.add('active');
            
            // Play video
            videoPlayer.load();
            videoPlayer.play()
                .catch(error => {
                    console.error('Error playing video:', error);
                    // Fallback for autoplay policy
                    const playButton = document.createElement('button');
                    playButton.textContent = 'Play Video';
                    playButton.className = 'fallback-play-button';
                    playButton.addEventListener('click', () => {
                        videoPlayer.play();
                        playButton.remove();
                    });
                    
                    const modalContent = document.querySelector('.modal-content');
                    modalContent.appendChild(playButton);
                });
            
            // Disable page scrolling
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeVideoModal() {
        videoModal.classList.remove('active');
        
        // Pause and reset video
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = '';
        
        // Re-enable page scrolling
        document.body.style.overflow = 'auto';
    }
    
    function filterVideos(category) {
        // For a simple implementation, we'll just log the category
        console.log('Filtering by category:', category);
        
        // If using the "all" category, show all videos
        if (category === 'all') {
            videoCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // Otherwise, filter by category
            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // In a full implementation, you might need to restructure the rows
        // or adjust the sliders after filtering
    }
    
    // Netflix-style hover effect for video cards
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover class to siblings
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.opacity = '0.5';
                    sibling.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover class from siblings
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach(sibling => {
                sibling.style.opacity = '1';
                sibling.style.transform = 'scale(1)';
            });
        });
    });
    
    // Add lightning effect on hero section
    const heroSection = document.querySelector('.video-hero-section');
    if (heroSection) {
        setInterval(() => {
            const lightning = document.createElement('div');
            lightning.className = 'lightning-flash';
            lightning.style.left = Math.random() * 100 + '%';
            heroSection.appendChild(lightning);
            
            setTimeout(() => {
                lightning.remove();
            }, 1000);
        }, 5000);
    }
    
    // Responsive adjustments for mobile
    function adjustForMobile() {
        const isMobile = window.innerWidth < 768;
        
        // Adjust card size for mobile
        videoCards.forEach(card => {
            if (isMobile) {
                card.style.flex = '0 0 200px';
            } else {
                card.style.flex = '0 0 300px';
            }
        });
    }
    
    // Call on load and resize
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.row-title, .video-row');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    document.querySelectorAll('.row-title, .video-row').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Add CSS styles for lightning effect
document.head.insertAdjacentHTML('beforeend', `
<style>
.lightning-flash {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: var(--primary);
    opacity: 0;
    z-index: 4;
    animation: flash 1s ease-out;
}

@keyframes flash {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    20% {
        opacity: 0;
    }
    30% {
        opacity: 0.8;
    }
    40% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}

.fallback-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background-color: var(--primary);
    color: var(--dark);
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    z-index: 5;
}
</style>
`);