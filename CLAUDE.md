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
- **Tour dates**: Toggle system for past/future dates
- **Music section**: Spotify embeds, YouTube videos
- **SEO**: Schema.org structured data for band and events
- **Contact**: Formspree integration

## Current Events
- **EP "DIURNE" Release Party**: February 20, 2026 @ Le Belvédère
- Tickets: Billetweb
- Facebook Event linked

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
