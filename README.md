# RiseOnPodcast

Marketing website for RiseOnPodcast — India's motivational podcast for introverts.

## Stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4
- Framer Motion

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/episodes` | Episode library |
| `/sessions` | Upcoming sessions |
| `/guest` | Become a guest application |
| `/contact` | Contact |
| `/admin` | Content manager |

## Project Structure

```
src/
  components/
    layout/     Navbar, Footer, PageLayout
    ui/         Button, Card, Tag, FadeIn, etc.
    episodes/   EpisodeCard
  pages/        Route-level page components
  data/         Static content & podcast data
  utils/        localStorage helpers
```
