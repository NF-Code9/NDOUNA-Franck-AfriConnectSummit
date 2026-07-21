# AfriConnect Summit

**Auteur :** NDOUNA Franck  
**Promotion :** L1 SEMI — ISI 2025 - 2026

## Description du projet

Site vitrine complet pour **AfriConnect Summit**, une conférence tech panafricaine fictive réunissant développeurs, entrepreneurs et investisseurs du continent. Le site comprend 4 pages HTML interconnectées, un design moderne en dark mode par défaut, des animations sobres et une expérience entièrement responsive.

**Dates fictives :** 15–17 Septembre 2026 · Abidjan, Côte d'Ivoire

## Technologies utilisées

| Technologie | Usage |
|---|---|
| HTML5 | Structure sémantique, accessibilité, formulaires |
| CSS3 | Flexbox, Grid, variables CSS, animations, media queries |
| JavaScript (Vanilla) | Interactivité, validation, dark mode, animations scroll |
| Google Fonts | Syne (titres) + DM Sans (corps) |
| Bootstrap Icons | Icônes (CDN) |
| Git & GitHub Pages | Versioning et déploiement |

## Structure du projet

```
AfriConnectSummit/
├── index.html          → Page d'accueil
├── programme.html      → Programme sur 3 jours
├── intervenants.html   → Grille filtrable d'intervenants
├── contact.html        → Inscription & FAQ
├── css/
│   └── style.css       → Feuille de styles unique
├── js/
│   └── main.js         → JavaScript principal
├── images/             → Photos (Unsplash)
└── README.md
```

## Fonctionnalités JavaScript implémentées

1. **Dark Mode / Light Mode** — Toggle navbar, persistance `localStorage`, variables CSS `[data-theme="dark"]`
2. **Navbar dynamique** — Fond et ombre après 80px de scroll, menu hamburger mobile
3. **Animations au scroll** — `IntersectionObserver` (fade-in, slide-in, zoom-in)
4. **Compte à rebours** — Temps réel jusqu'au 15 septembre 2026
5. **Compteurs animés** — Chiffres clés qui s'incrémentent au scroll
6. **Onglets programme** — 3 jours affichés/masqués sans rechargement
7. **Filtrage intervenants** — Par thématique (IA & Tech, Business, Design, Data)
8. **Validation formulaire** — Regex email, téléphone 8+ chiffres, message 20+ caractères
9. **Bouton retour en haut** — Visible après 300px, scroll smooth
10. **Année dynamique** — `new Date().getFullYear()` dans tous les footers

## Déploiement GitHub Pages

> **Lien GitHub Pages :** https://nf-code9.github.io/NDOUNA-Franck-AfriConnectSummit/

## Ressources consultées

- [Web Summit](https://websummit.com) — Hero immersif, compte à rebours
- [Awwwards Conference](https://conference.awwwards.com) — Typographie expressive
- [Config Figma](https://config.figma.com) — Design system, dark mode
- [Google I/O](https://io.google) — Grille sessions, responsive
- [Africa Tech Summit](https://africatechsummit.com) — Structure événement africain
- [Coolors](https://coolors.co) — Palette de couleurs
- [Google Fonts](https://fonts.google.com) — Paires typographiques Syne + DM Sans
- [Unsplash](https://unsplash.com) — Photos libres des intervenants
- [Bootstrap Icons](https://icons.getbootstrap.com) — Bibliothèque d'icônes

## Palette de couleurs

| Couleur | Variable | Usage |
|---|---|---|
| Or africain | `--color-primary: #e8a838` | CTAs, accents, compteurs |
| Teal tech | `--color-secondary: #00bfa6` | Liens, badges, filtres actifs |
| Corail | `--color-accent: #ff6b35` | Hover boutons |
| Fond sombre | `--color-bg: #0d1117` | Dark mode background |

## Auteur

**By GhostDev**