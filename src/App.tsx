import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { HelpRail } from '@/components/HelpRail/HelpRail';
import { GuardedPage } from '@/components/GuardedPage';
import { HomePage } from '@/pages/Home';
import { AboutPage } from '@/pages/About';
import { SkillsPage } from '@/pages/Skills';
import { ServicesPage } from '@/pages/Services';
import { ProjectsPage } from '@/pages/Projects';
import { ExperiencePage } from '@/pages/Experience';
import { ContactPage } from '@/pages/Contact';
import { HowItWorksPage } from '@/pages/HowItWorks';
import { AdminLoginPage } from '@/pages/admin/AdminLogin';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboard';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { firstEnabledPath } from '@/lib/pageControls';

function PageFade({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { settings } = useSiteSettings();
  const fallbackPath = firstEnabledPath(settings);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait">
          <PageFade key={location.pathname}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <GuardedPage path="/">
                    <HomePage />
                  </GuardedPage>
                }
              />
              <Route
                path="/about"
                element={
                  <GuardedPage path="/about">
                    <AboutPage />
                  </GuardedPage>
                }
              />
              <Route
                path="/skills"
                element={
                  <GuardedPage path="/skills">
                    <SkillsPage />
                  </GuardedPage>
                }
              />
              <Route
                path="/services"
                element={
                  <GuardedPage path="/services">
                    <ServicesPage />
                  </GuardedPage>
                }
              />
              <Route
                path="/process"
                element={
                  <GuardedPage path="/process">
                    <HowItWorksPage />
                  </GuardedPage>
                }
              />
              <Route
                path="/projects"
                element={
                  <GuardedPage path="/projects">
                    <ProjectsPage />
                  </GuardedPage>
                }
              />
              <Route
                path="/experience"
                element={
                  <GuardedPage path="/experience">
                    <ExperiencePage />
                  </GuardedPage>
                }
              />
              <Route
                path="/contact"
                element={
                  <GuardedPage path="/contact">
                    <ContactPage />
                  </GuardedPage>
                }
              />
              <Route path="*" element={<Navigate to={fallbackPath} replace />} />
            </Routes>
          </PageFade>
        </AnimatePresence>
      </main>
      <Footer />
      <HelpRail />
    </div>
  );
}
