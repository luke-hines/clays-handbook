import { Routes, Route, Navigate } from 'react-router-dom'

// Shared
import Nav    from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

// Learner screens
import HomePage        from '@/screens/HomePage'
import LessonsPage     from '@/screens/LessonsPage'
import LessonDetailPage from '@/screens/LessonDetailPage'
import GlossaryPage    from '@/screens/GlossaryPage'
import ModulesPage     from '@/screens/ModulesPage'
import ModuleDetailPage from '@/screens/ModuleDetailPage'
import QuizPage        from '@/screens/QuizPage'

// Tools
import ToolsPage from '@/screens/ToolsPage'

// Progress
import ProgressPage from '@/screens/ProgressPage'

// Creator screens
import CreatorDashboard  from '@/screens/CreatorDashboard'
import LessonGenerator   from '@/screens/LessonGenerator'

export default function App() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Learner */}
          <Route path="/"                        element={<HomePage />} />
          <Route path="/lessons"                 element={<LessonsPage />} />
          <Route path="/lessons/:slug"           element={<LessonDetailPage />} />
          <Route path="/glossary"                element={<GlossaryPage />} />
          <Route path="/modules"                 element={<ModulesPage />} />
          <Route path="/modules/:slug"           element={<ModuleDetailPage />} />
          <Route path="/quiz/:lessonSlug"        element={<QuizPage />} />

          {/* Progress */}
          <Route path="/progress"                element={<ProgressPage />} />

          {/* Tools */}
          <Route path="/tools"                   element={<ToolsPage />} />

          {/* Creator */}
          <Route path="/creator"                 element={<CreatorDashboard />} />
          <Route path="/creator/generate"        element={<LessonGenerator />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
