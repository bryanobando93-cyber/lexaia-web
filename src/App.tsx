import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainContainer } from './components/MainContainer';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
