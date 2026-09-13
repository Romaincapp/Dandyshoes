# DANDYSHOES Website - Project Context

## Project Overview
Official website for **DANDYSHOES**, a Belgian Rock'n'Roll band from Charleroi. The site showcases their music, tour dates, band info, and media.

## Tech Stack
- **HTML5** with Schema.org microdata for SEO
- **CSS3** modular architecture (compiled with `build-css.js`)
- **Vanilla JavaScript** (no frameworks)
- **Formspree** for contact form handling

## Project Structure
```
Dandyshoes/
├── index.html          # Main page
├── pro.html            # Professional/booking page
├── videos.html         # Video gallery
├── main.js             # Core JavaScript
├── contact-form.js     # Form handling
├── build-css.js        # CSS build system
├── css/
│   ├── base/           # Variables, reset, typography
│   ├── components/     # Buttons, cards, modals
│   ├── sections/       # Music, tour, about, contact, etc.
│   ├── effects/        # Animations, hover effects
│   ├── responsive/     # Mobile, tablet, desktop breakpoints
│   └── dist/           # Compiled CSS (style.css, style.min.css)
├── img/
│   ├── webp/           # Optimized WebP images
│   └── compressed/     # Fallback JPG/PNG
└── audio/, videos/, font/
```

## CSS Build System
After modifying any CSS file in `css/`, run:
```bash
node build-css.js
```
This compiles all CSS modules into `css/dist/style.min.css`.

## Key Features
- **Responsive design**: Breakpoints at 768px, 480px, 360px
- **Tour dates**: Tri automatique passé/futur + boutons Agenda
- **Music section**: Spotify embeds, YouTube videos
- **SEO**: Schema.org structured data for band and events
- **Contact**: Formspree integration

## Tour Dates System

### Ajouter une nouvelle date
1. **`index.html`** — ajouter un bloc `.tour-date` avec l'attribut `data-date="YYYY-MM-DD"` dans la section `#tour > .tour-list`, **avant** le bouton toggle :
```html
<div class="tour-date" data-date="2027-03-15">
    <div class="date-location">
        <div class="date">Mar 15, 2027</div>
        <div>
            <div class="location">Ville, Pays</div>
            <div class="venue">Nom de la salle</div>
        </div>
    </div>
    <div class="tour-buttons">
        <a href="https://maps.google.com/?q=..." target="_blank" class="tickets-btn">Maps</a>
    </div>
</div>
```

2. **`main.js`** — ajouter une entrée dans l'objet `concerts` (section *"Initialiser les boutons d'ajout au calendrier"*) pour que le bouton **Agenda** apparaisse :
```js
"2027-03-15": {
    title: "DANDYSHOES - Nom de la salle",
    location: "Ville, Pays",
    venue: "Nom de la salle",
    startTime: "20:00",
    endTime: "23:00"
},
```

3. **`index.html` — Schema.org** — ajouter l'événement dans le bloc `<script type="application/ld+json">` pour le SEO :
```json
{
  "@type": "MusicEvent",
  "name": "DANDYSHOES at Nom de la salle",
  "startDate": "2027-03-15T20:00",
  "location": {
    "@type": "Place",
    "name": "Nom de la salle",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ville",
      "addressCountry": "BE"
    }
  }
}
```

### Tri automatique passé/futur
La fonction `autoSortTourDates()` dans `main.js` s'exécute au chargement et :
- Compare chaque `.tour-date[data-date]` du bloc principal avec la date du jour
- Déplace automatiquement les dates passées dans `#dates2025` (section repliée)
- Met à jour le compteur *"Dates passées (N dates)"*

**Aucune intervention manuelle nécessaire** — les dates basculent automatiquement dans le passé.

## Upcoming Events
- **Oct 17, 2026** — Petit Wood Night, Wattignies-la-Victoire, France
- **Oct 18, 2026** — Chop and Rock, Sedan, France
- **Nov 28, 2026** — Le Zik-Zak, Ittre, Belgium (avec Springclean)
- **Feb 5, 2027** — Centre Culturel de Philippeville, Belgium (20h)

## Band Members
- Allan Berger - Vocals, Guitar
- Romain Dumoulin - Drums
- Antoine Chauvaux - Bass
- Arnaud Lietor Torres - Guitar

## External Services
- **Formspree**: Contact form (ID: mrbqwbpo)
- **Spotify**: Artist page embeds
- **YouTube**: Video embeds
- **Billetweb**: Ticket sales

## Design Guidelines
- Primary color: `#ff3c3c` (red)
- Background: Dark theme (`#121212`)
- Font: Inter (Google Fonts)
- Style: Rock/grungy aesthetic with modern touches

## Git Workflow
- Main branch: `main`
- Remote: `https://github.com/Romaincapp/Dandyshoes`
