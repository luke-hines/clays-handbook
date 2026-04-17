import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'

// Shared
import Nav              from '@/components/shared/Nav'
import Footer           from '@/components/shared/Footer'
import TrackBackground  from '@/components/shared/TrackBackground'

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

// Pricing + auth
import PricingPage from '@/screens/PricingPage'
import SuccessPage from '@/screens/SuccessPage'

// Creator screens
import CreatorDashboard  from '@/screens/CreatorDashboard'
import LessonGenerator   from '@/screens/LessonGenerator'
import CreatorGate       from '@/components/shared/CreatorGate'

function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <>
      <TrackBackground />
      <Nav />
      <main style={{ flex: 1, position: 'relative', zIndex: 2 }}>
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

          {/* Pricing + success */}
          <Route path="/pricing"                 element={<PricingPage />} />
          <Route path="/success"                 element={<SuccessPage />} />

          {/* Auth */}
          <Route
            path="/sign-in/*"
            element={
              <AuthPage>
                <SignIn routing="path" path="/sign-in" afterSignInUrl="/" />
              </AuthPage>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <AuthPage>
                <SignUp routing="path" path="/sign-up" afterSignUpUrl="/" />
              </AuthPage>
            }
          />

          {/* Creator */}
          <Route path="/creator"          element={<CreatorGate><CreatorDashboard /></CreatorGate>} />
          <Route path="/creator/generate" element={<CreatorGate><LessonGenerator /></CreatorGate>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
