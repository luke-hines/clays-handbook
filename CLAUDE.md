# Clay's Handbook — Claude Code Project Guide

## What is Clay's Handbook?
An interactive racing and car knowledge education platform. Think high-performance racing academy, but explained like experienced guys casually talking to other guys — not a generic course site.

Two pillars:
- **Racing** — sim-first racecraft and driving technique
- **Car Knowledge** — how parts and systems work together

Two sides:
- **Learner side** — browse lessons, glossary, quizzes, modules
- **Creator side** — generate lesson drafts, quiz drafts, script outlines from a topic input

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **State**: Zustand (persisted drafts)
- **Server state**: React Query
- **Build**: Vite

## Design System
- **Theme**: Dark. Always dark. High contrast.
- **Accent**: Racing red `#E8322A` — CTAs, pillar badges, danger
- **Gold**: `#C9A84C` — achievement, featured content
- **Steel blue**: `#4A9EDB` — car knowledge pillar
- **Base surfaces**: `#0D0D0D` bg → `#161616` cards → `#1E1E1E` elevated
- **Fonts**: Inter or DM Sans (body), can use a display font for headings
- **Aesthetic**: Functional, fast, no fluff. Not a gaming site. Not a blog.

## Project Structure
```
src/
  screens/
    HomePage.tsx          # Hero, featured lessons, module highlights
    LessonsPage.tsx        # Grid + filters (pillar, category, difficulty)
    LessonDetailPage.tsx   # Video, body, inline concepts, diagrams, quiz CTA
    GlossaryPage.tsx       # Searchable concept list
    ModulesPage.tsx        # Module cards linking to lesson groups
    QuizPage.tsx           # Multiple choice, score, explanations
    CreatorDashboard.tsx   # Draft list, publish actions
    LessonGenerator.tsx    # Topic form → AI-generated draft
  components/
    learner/               # LessonCard, ConceptModal, DiagramViewer, QuizCard
    creator/               # DraftCard, GeneratorForm, OutputPanel
    shared/                # Nav, Footer, PillBadge, DifficultyBadge
  lib/
    mockData.ts            # Seed lessons, concepts, modules, quizzes
    store.ts               # Zustand — drafts only
  types/
    index.ts               # All shared TypeScript types
  styles/
    globals.css            # CSS variables + Tailwind base
```

## Data Model
- **Lesson** — pillar, category, difficulty, keyTakeaways, body (markdown), conceptIds, quizId
- **Concept** — slug, title, summary, body, relatedConceptIds (glossary terms)
- **Module** — groups lessons, no locked progression
- **Quiz** — questions with options, correctIndex, explanation
- **LessonDraft** — creator-side generated content, stored in Zustand

## Seed Content
**Racing:** Trail Braking, Overtaking, Defense (letting drivers past)
**Car:** Suspension, Brake Balance, Differential, Tire Temperature

## Key Behaviors
- No auth — free browsing everywhere
- Quizzes are optional, always tied to a lesson
- Concepts are inline-clickable in lesson body (open modal)
- Creator generator produces structured draft from: topic + pillar + category + difficulty + goal
- No locked progression — users jump in anywhere

## Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run typecheck # TypeScript check (tsc --noEmit)
```
