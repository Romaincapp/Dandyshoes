// pro.js - Script pour la page Pro DANDYSHOES

// Configuration
const PRO_CONFIG = {
    password: "dandyrock2025", // ⚠️ À CHANGER pour plus de sécurité !
    sessionDuration: 4 * 60 * 60 * 1000, // 4 heures en millisecondes
    storageKey: 'dandyshoes_pro_access'
};

// Classe pour gérer l'authentification Pro
class ProAuth {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkExistingAccess();
        this.addAnimationStyles();
    }
    
    setupEventListeners() {
        // Validation par clic sur le bouton
        const submitBtn = document.querySelector('.password-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.checkPassword());
        }
        
        // Validation par touche Entrée
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkPassword();
                }
            });
            
            // Réinitialiser les styles d'erreur lors de la saisie
            passwordInput.addEventListener('input', () => {
                this.resetErrorState();
            });
        }
    }
    
    checkPassword() {
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('errorMessage');
        
        if (!input) return;
        
        if (input.value === PRO_CONFIG.password) {
            this.grantAccess();
        } else {
            this.showError();
        }
    }
    
    grantAccess() {
        // Cacher l'overlay de mot de passe
        const overlay = document.getElementById('passwordOverlay');
        const mainContent = document.getElementById('mainContent');
        
        if (overlay && mainContent) {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Animation d'entrée fluide
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.5s ease';
                mainContent.style.opacity = '1';
            }, 100);
        }
        
        // Enregistrer la session
        this.saveSession();
        
        // Message de bienvenue
        this.showWelcomeNotification();
    }
    
    showError() {
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('errorMessage');
        
        if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.style.animation = 'fadeIn 0.3s ease';
        }
        
        if (input) {
            input.value = '';
            input.style.borderColor = '#ff3c3c';
            input.style.animation = 'shake 0.5s ease';
            input.focus();
            
            // Réinitialiser l'animation après
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }
    
    resetErrorState() {
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('errorMessage');
        
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
        
        if (input) {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    }
    
    saveSession() {
        const expiry = Date.now() + PRO_CONFIG.sessionDuration;
        localStorage.setItem(PRO_CONFIG.storageKey, expiry.toString());
    }
    
    checkExistingAccess() {
        const savedAccess = localStorage.getItem(PRO_CONFIG.storageKey);
        
        if (savedAccess && Date.now() < parseInt(savedAccess)) {
            // Session encore valide
            const overlay = document.getElementById('passwordOverlay');
            const mainContent = document.getElementById('mainContent');
            
            if (overlay && mainContent) {
                overlay.style.display = 'none';
                mainContent.classList.remove('hidden');
            }
        }
    }
    
    logout() {
        localStorage.removeItem(PRO_CONFIG.storageKey);
        
        // Notification de déconnexion
        this.showNotification('🔒 Déconnexion réussie', 'info');
        
        // Rediriger après un court délai
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
    
    showWelcomeNotification() {
        this.showNotification('🎸 Bienvenue dans l\'espace Pro DANDYSHOES !', 'success');
    }
    
    showNotification(message, type = 'info') {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `pro-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-suppression
        setTimeout(() => this.removeNotification(notification), 5000);
        
        // Bouton fermer
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.removeNotification(notification));
        }
    }
    
    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .pro-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 2000;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            
            .pro-notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .pro-notification .notification-content {
                background: var(--dark);
                border: 2px solid var(--primary);
                border-radius: 8px;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            .pro-notification.success .notification-content {
                border-color: #4CAF50;
                background: linear-gradient(145deg, #1a1a1a, #0f1f0f);
            }
            
            .pro-notification.info .notification-content {
                border-color: #2196F3;
                background: linear-gradient(145deg, #1a1a1a, #0f0f1f);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--light);
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .pro-notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Classe pour gérer les téléchargements
class ProDownloads {
    constructor() {
        this.setupDownloadHandlers();
    }
    
    setupDownloadHandlers() {
        // Dans un vrai site, ces fonctions téléchargeraient des vrais fichiers
        window.downloadTechSheet = () => this.downloadFile('fiche-technique-dandyshoes.pdf');
        window.downloadFullRider = () => this.downloadFile('rider-complet-dandyshoes.pdf');
        window.downloadSetlist = () => this.downloadFile('setlists-dandyshoes.pdf');
    }
    
    downloadFile(filename) {
        // Simulation de téléchargement
        // Dans la vraie version, vous auriez des liens vers des vrais fichiers PDF
        
        this.showDownloadModal(filename);
    }
    
    showDownloadModal(filename) {
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="download-modal-content">
                <h3>📄 Téléchargement</h3>
                <p>Le fichier <strong>${filename}</strong> est en cours de préparation.</p>
                <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">
                    Dans la version finale, ce lien téléchargera automatiquement le document PDF.
                </p>
                <div style="margin-top: 2rem;">
                    <button class="download-btn" onclick="this.closest('.download-modal').remove()">
                        OK
                    </button>
                </div>
            </div>
        `;
        
        // Styles pour le modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        `;
        
        const content = modal.querySelector('.download-modal-content');
        content.style.cssText = `
            background: var(--dark);
            border: 2px solid var(--primary);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        document.body.appendChild(modal);
        
        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Classe pour le menu mobile
class ProMobileMenu {
    constructor() {
        this.setupMobileMenu();
    }
    
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileMenuToggle && navLinks) {
            // Toggle du menu
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
            
            // Fermer le menu au clic sur un lien
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                });
            });
            
            // Fermer le menu au clic à l'extérieur
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('active') && 
                    !navLinks.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        }
    }
}

// Fonction globale pour la déconnexion (appelée depuis le HTML)
window.logout = function() {
    if (window.proAuth) {
        window.proAuth.logout();
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les classes
    window.proAuth = new ProAuth();
    window.proDownloads = new ProDownloads();
    window.proMobileMenu = new ProMobileMenu();
    
    // Ajouter des effets visuels
    addProVisualEffects();
    
    // Vérifier périodiquement si la session est encore valide
    setInterval(() => {
        const savedAccess = localStorage.getItem(PRO_CONFIG.storageKey);
        if (!savedAccess || Date.now() > parseInt(savedAccess)) {
            // Session expirée
            localStorage.removeItem(PRO_CONFIG.storageKey);
            if (window.proAuth) {
                window.proAuth.showNotification('⏰ Session expirée. Veuillez vous reconnecter.', 'info');
                setTimeout(() => window.location.reload(), 2000);
            }
        }
    }, 60000); // Vérifier toutes les minutes
});

// Effets visuels pour la page Pro
function addProVisualEffects() {
    // Animation des cartes au scroll
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
    
    // Observer toutes les cartes pro
    document.querySelectorAll('.pro-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Effet de typing sur le titre
    const title = document.querySelector('.section-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            title.textContent += originalText[i];
            i++;
            if (i >= originalText.length) {
                clearInterval(typingInterval);
                // Ajouter un effet de clignotement final
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                title.appendChild(cursor);
                
                setTimeout(() => cursor.remove(), 3000);
            }
        }, 100);
    }
    
    // Ajouter l'animation de clignotement
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(blinkStyle);
}

// Fonctions utilitaires
const ProUtils = {
    // Formater un numéro de téléphone
    formatPhone: (phone) => {
        return phone.replace(/(\+32)(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    },
    
    // Copier du texte dans le presse-papiers
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            if (window.proAuth) {
                window.proAuth.showNotification('📋 Copié dans le presse-papiers', 'success');
            }
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
    },
    
    // Détecter si on est sur mobile
    isMobile: () => {
        return window.innerWidth < 768;
    },
    
    // Smooth scroll vers un élément
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Ajouter les fonctions utilitaires aux éléments cliquables
document.addEventListener('DOMContentLoaded', function() {
    // Rendre les emails et téléphones cliquables et copiables
    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        link.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const text = link.textContent.trim();
            ProUtils.copyToClipboard(text);
        });
    });
});

// Export pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProAuth, ProDownloads, ProMobileMenu, ProUtils };
}