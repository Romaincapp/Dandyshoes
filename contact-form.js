// contact-form.js - Formulaire de contact DANDYSHOES
// Créez ce fichier à la racine de votre projet

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const consent = document.querySelector('input[name="consent"]').checked;
            
            // Validation côté client
            if (!name || !email || !message) {
                e.preventDefault(); // Empêcher la soumission seulement si erreur
                showNotification('Veuillez remplir tous les champs obligatoires (nom, email, message).', 'error');
                return false;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return false;
            }
            
            // Validation consentement RGPD
            if (!consent) {
                e.preventDefault();
                showNotification('Veuillez accepter la politique de confidentialité.', 'error');
                return false;
            }
            
            // Si tout est OK, on laisse le formulaire se soumettre naturellement à Formspree
            showLoadingState();
            
            // Message d'info pendant l'envoi
            setTimeout(() => {
                showNotification('Message en cours d\'envoi...', 'info');
            }, 100);
        });
    }
    
    // Fonction pour afficher les notifications
    function showNotification(message, type = 'success') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Créer la nouvelle notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Ajouter au body
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Bouton de fermeture
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // État de chargement du bouton
    function showLoadingState() {
        if (submitBtn) {
            submitBtn.innerHTML = `
                <span class="loading-spinner"></span>
                Envoi en cours...
            `;
            submitBtn.disabled = true;
        }
    }
    
    // Réinitialiser l'état du bouton
    function resetButtonState() {
        if (submitBtn) {
            submitBtn.innerHTML = 'Envoyer le message';
            submitBtn.disabled = false;
        }
    }
    
    // Gestion de la réponse Formspree (si on reste sur la même page)
    // Vérifier les paramètres URL pour les messages de succès/erreur
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
        showNotification('🎸 Merci pour votre message ! Nous vous répondrons très bientôt.', 'success');
        if (contactForm) contactForm.reset();
        resetButtonState();
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    if (urlParams.get('error') === 'true') {
        showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
        resetButtonState();
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Validation en temps réel
    const formInputs = contactForm ? contactForm.querySelectorAll('input:not([type="checkbox"]), textarea') : [];
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Supprimer les styles d'erreur pendant la saisie
            this.classList.remove('error');
            
            // Activer le label si il y a du contenu
            const label = this.parentElement.querySelector('label');
            if (label) {
                if (this.value.trim()) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Supprimer les classes existantes
        field.classList.remove('error', 'success');
        
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        if (value) {
            field.classList.add('success');
        }
        
        return true;
    }
    
    // Animation des labels flottants
    formInputs.forEach(input => {
        const label = input.parentElement.querySelector('label');
        
        if (input.value) {
            label.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            if (label) label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (label && !input.value) {
                label.classList.remove('active');
            }
        });
    });
    
    // Gestion du checkbox RGPD
    const consentCheckbox = document.querySelector('input[name="consent"]');
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.opacity = '1';
            } else {
                this.parentElement.style.opacity = '0.7';
            }
        });
    }
});

// CSS pour les notifications et améliorations (injecté dynamiquement)
const contactFormStyles = `
<style>
/* Notifications dynamiques */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
}

.notification.show {
    opacity: 1;
    transform: translateX(0);
}

.notification-content {
    background: var(--dark);
    border: 2px solid var(--primary);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
}

.notification-success .notification-content {
    border-color: #4CAF50;
    background: linear-gradient(145deg, #1a1a1a, #0f1f0f);
}

.notification-error .notification-content {
    border-color: #f44336;
    background: linear-gradient(145deg, #1a1a1a, #1f0f0f);
}

.notification-info .notification-content {
    border-color: #2196F3;
    background: linear-gradient(145deg, #1a1a1a, #0f0f1f);
}

.notification-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.notification-message {
    flex: 1;
    color: var(--light);
    font-size: 0.9rem;
    line-height: 1.4;
}

.notification-close {
    background: none;
    border: none;
    color: var(--light);
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
}

/* Spinner de chargement */
.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid var(--dark);
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Responsive notifications */
@media (max-width: 768px) {
    .notification {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
    
    .notification-content {
        padding: 0.8rem;
    }
    
    .notification-message {
        font-size: 0.85rem;
    }
}
</style>
`;

// Injecter les styles dynamiques
document.head.insertAdjacentHTML('beforeend', contactFormStyles);