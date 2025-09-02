import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { clsx } from 'clsx';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slide: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onSlideChange,
  isPlaying,
  onTogglePlay
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onSlideChange(Math.max(0, currentSlide - 1))}
        disabled={currentSlide === 0}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Slide Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={clsx(
              'w-10 h-10 rounded-full font-medium transition-all duration-300',
              currentSlide === index
                ? 'bg-yellow-500 text-slate-900'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-slate-900" />
        ) : (
          <Play className="w-5 h-5 text-slate-900" />
        )}
      </button>

      {/* Next Button */}
      <button
        onClick={() => onSlideChange(Math.min(totalSlides - 1, currentSlide + 1))}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};