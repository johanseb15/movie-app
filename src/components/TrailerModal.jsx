import { useEffect, useRef } from "react";

export default function TrailerModal({ videoKey, isOpen, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Limpiar el iframe al cerrar
      if (iframeRef.current) {
        iframeRef.current.src = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !videoKey) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors text-2xl font-light"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          />
        </div>
      </div>
    </div>
  );
}

