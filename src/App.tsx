import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MainContainer } from './components/MainContainer';
import './App.css';

// Lazy load pages for code splitting
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(module => ({ default: module.FAQPage })));
const AulaVirtualPage = lazy(() => import('./pages/AulaVirtualPage').then(module => ({ default: module.AulaVirtualPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(module => ({ default: module.CookiePolicyPage })));
const LegalNoticePage = lazy(() => import('./pages/LegalNoticePage').then(module => ({ default: module.LegalNoticePage })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <p className="text-slate-400 mt-4">Cargando...</p>
    </div>
  </div>
);

// Component to handle scroll restoration
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo(0, 0);

    // Clear any hash from URL to prevent auto-scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/aula-virtual" element={<AulaVirtualPage />} />
            <Route path="/privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/terminos" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
