'use client';

import { useState } from 'react';
import { Award, FileText, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateCardProps {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: 'primary' | 'accent';
  images?: string[];
}

export default function CertificateCard({
  id,
  name,
  description,
  icon: Icon,
  color,
  images = [],
}: CertificateCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImages = images.length > 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div
        className={cn(
          'group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:border-accent/50',
          hasImages && 'cursor-pointer'
        )}
        onClick={() => hasImages && setIsModalOpen(true)}
      >
        {/* Certificate Images or Header */}
        {hasImages ? (
          <div className="relative w-full bg-slate-100 overflow-hidden">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-slate-200 flex items-center justify-center min-h-96">
              <img
                src={images[selectedImageIndex]}
                alt={`${name} Certificate ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-black/10">
                <button
                  onClick={handlePrevImage}
                  className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-5 w-5 text-slate-700" />
                </button>
              </div>
            )}

            {/* Image Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(idx);
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      idx === selectedImageIndex ? 'bg-white w-6' : 'bg-white/60'
                    )}
                    aria-label={`View certificate ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Click to View Label */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="text-white font-semibold text-sm">Click to view full size</div>
            </div>
          </div>
        ) : (
          <div
            className={`bg-gradient-to-r ${
              color === 'primary' ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'
            } px-8 py-8`}
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md group-hover:shadow-lg transition">
              <Icon
                className={`h-8 w-8 ${color === 'primary' ? 'text-primary' : 'text-accent'}`}
              />
            </div>
            <h3
              className={`text-2xl font-black uppercase tracking-tight ${
                color === 'primary' ? 'text-primary' : 'text-accent'
              }`}
            >
              {name}
            </h3>
          </div>
        )}

        {/* Certificate Body */}
        <div className="p-8">
          <p className="text-foreground/70 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {isModalOpen && hasImages && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full h-full flex flex-col max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 -right-10 p-2 hover:bg-white/10 rounded-full transition z-10"
              aria-label="Close modal"
            >
              <X className="h-8 w-8 text-white" />
            </button>

            {/* Image */}
            <div className="relative flex-1 bg-slate-900 rounded-lg overflow-auto flex items-center justify-center">
              <img
                src={images[selectedImageIndex]}
                alt={`${name} Certificate ${selectedImageIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation in Modal */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={handlePrevImage}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="text-white text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
                <button
                  onClick={handleNextImage}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
