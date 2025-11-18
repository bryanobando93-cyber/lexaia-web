import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import ReactMarkdown from 'react-markdown';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <span className="px-4 py-2 bg-primary/20 backdrop-blur-sm text-primary font-semibold rounded-full border border-primary/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Por {post.author}</span>
            </div>
            <button
              onClick={sharePost}
              className="ml-auto flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-md flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 rounded-xl overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-heading prose-headings:text-white
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-slate-300 prose-li:marker:text-primary
            prose-code:text-primary prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-blockquote:border-l-primary prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:rounded-r"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl border border-primary/30"
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-4">
            ¿Listo para transformar tu negocio con IA?
          </h3>
          <p className="text-slate-300 mb-6">
            En lexaia te ayudamos a implementar soluciones de automatización personalizadas para tu empresa.
          </p>
          <Link
            to="/"
            className="inline-block btn-primary px-8 py-3 rounded-lg font-semibold"
          >
            Agenda una Consulta Gratuita
          </Link>
        </motion.div>
      </article>
    </div>
  );
};
