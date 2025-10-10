# Configuration Formspree - DANDYSHOES

## Problèmes identifiés et corrigés

### ✅ Corrections apportées au code :

1. **JavaScript** (`contact-form.js`) :
   - Corrigé : `input[name="consent"]` → `input[name="privacy"]`
   - Ajouté : Logs de débogage pour tracer la soumission
   - Supprimé : Code pour checkbox custom inexistante

2. **HTML** (`index.html`) :
   - Supprimé : Champ `_cc` (non supporté par Formspree)
   - Amélioré : Protection anti-spam avec attributs supplémentaires

---

## 🔧 Configuration requise dans le Dashboard Formspree

### Étapes à suivre :

1. **Connectez-vous à Formspree** : https://formspree.io/forms/mrbqwbpo

2. **Vérifiez l'email de destination** :
   - Allez dans les paramètres du formulaire
   - Vérifiez que **dandyshoes@hotmail.be** est bien l'email configuré
   - Si ce n'est pas le cas, ajoutez-le ou modifiez-le

3. **Vérifiez l'activation du formulaire** :
   - Le formulaire doit être en statut **"Active"**
   - Si vous voyez un message de vérification d'email, vérifiez votre boîte mail

4. **Configurez les notifications** (important !) :
   - Dans "Settings" ou "Notifications"
   - Activez **"Email notifications"**
   - Vérifiez que l'adresse email est correcte

5. **Vérifiez le filtre anti-spam** :
   - Assurez-vous que le filtre anti-spam n'est pas trop strict
   - Dans "Spam Settings", vérifiez les paramètres

6. **Whitelisting du domaine** :
   - Dans "Settings" → "Domains"
   - Ajoutez `dandyshoes.be` et `www.dandyshoes.be`

---

## 🧪 Tests à effectuer

### Test 1 : Soumettre un message de test
1. Ouvrez la console développeur (F12)
2. Allez sur la section Contact
3. Remplissez tous les champs
4. Cochez la case de politique de confidentialité
5. Cliquez sur "Envoyer"
6. Vérifiez dans la console :
   ```
   Formulaire soumis - début de validation
   Valeurs du formulaire: {name: "Test", email: "test@test.com", ...}
   Validation réussie - envoi à Formspree
   ```

### Test 2 : Vérifier dans Formspree
1. Connectez-vous au dashboard Formspree
2. Allez dans "Submissions" (Soumissions)
3. Vous devriez voir votre message de test

### Test 3 : Vérifier vos emails
1. Vérifiez la boîte de réception : **dandyshoes@hotmail.be**
2. Vérifiez également le dossier **SPAM/Courrier indésirable**
3. Si vous trouvez un email de Formspree dans les spams, marquez-le comme "Non spam"

---

## 🔍 Débogage

### Si le formulaire ne s'envoie pas :

Ouvrez la console (F12) et tapez :
```javascript
testForm()
```

Cela affichera toutes les informations sur le formulaire.

### Si vous ne recevez pas d'emails :

1. **Vérifiez le dashboard Formspree** : Les soumissions apparaissent-elles ?
   - ✅ OUI → Le problème est dans la notification email
   - ❌ NON → Le problème est dans l'envoi du formulaire

2. **Si les soumissions apparaissent mais pas les emails** :
   - Vérifiez l'adresse email dans les paramètres Formspree
   - Vérifiez les dossiers spam/courrier indésirable
   - Vérifiez que les notifications sont activées dans Formspree

3. **Si rien n'apparaît dans Formspree** :
   - Vérifiez que l'ID du formulaire est correct : `mrbqwbpo`
   - Vérifiez qu'il n'y a pas d'erreurs dans la console (F12)
   - Essayez de soumettre directement sans le JavaScript

---

## 📧 Configuration email recommandée

### Dans Formspree Dashboard :

**Email Notifications Settings** :
- ✅ Send email notifications : **ON**
- ✅ Notification email : **dandyshoes@hotmail.be**
- ✅ Include form data in notification : **ON**
- ⚠️ Custom notification template : (optionnel)

**Spam Protection** :
- ✅ Enable honeypot : **ON** (champ `_gotcha`)
- ✅ Enable reCAPTCHA : **OFF** (déjà avec honeypot)

**Response Settings** :
- ✅ Auto-response : **OFF** (ou personnalisez si vous voulez)
- ✅ Redirect after submit : **https://www.dandyshoes.be/index.html?success=true**

---

## 🆘 Support

Si le problème persiste après avoir vérifié tous ces points :

1. Vérifiez le statut de Formspree : https://status.formspree.io/
2. Contactez le support Formspree avec :
   - Form ID : `mrbqwbpo`
   - URL du site : `https://www.dandyshoes.be`
   - Description du problème

---

## ✅ Checklist de vérification

- [ ] Email vérifié dans Formspree
- [ ] Formulaire en statut "Active"
- [ ] Notifications email activées
- [ ] Domaine whitelisté (dandyshoes.be)
- [ ] Test de soumission effectué
- [ ] Soumission visible dans le dashboard
- [ ] Email reçu dans la boîte de réception
- [ ] Filtre anti-spam configuré

---

Dernière mise à jour : 2025-10-10
