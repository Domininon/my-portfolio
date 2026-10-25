import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { popupConfig, type PopupTheme, type PopupLayout } from '@/config/popupConfig';
import { shouldShowPopup, markPopupDismissed } from '@/lib/popupStorage';

const themeStyles: Record<PopupTheme, { panel: string; eyebrow: string; heading: string; body: string }> = {
  forest: {
    panel: 'bg-forest',
    eyebrow: 'text-lime',
    heading: 'text-paper',
    body: 'text-paper/70',
  },
  ink: {
    panel: 'bg-ink',
    eyebrow: 'text-lime',
    heading: 'text-paper',
    body: 'text-paper/70',
  },
  paper: {
    panel: 'bg-paper',
    eyebrow: 'text-forest',
    heading: 'text-ink',
    body: 'text-ink/70',
  },
  brand: {
    panel: 'bg-forest',
    eyebrow: 'text-lime',
    heading: 'text-paper',
    body: 'text-paper/70',
  },
};

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const config = popupConfig;

  const close = useCallback(() => {
    setVisible(false);
    markPopupDismissed(config);
  }, [config]);

  // Eligibility + delay check on route change
  useEffect(() => {
    if (!shouldShowPopup(config, pathname)) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, config.delayMs);

    return () => clearTimeout(timer);
  }, [config, pathname]);

  // Lock body scroll + Esc to close + focus management while open
  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [visible, close]);

  // Tab trap inside the modal
  useEffect(() => {
    if (!visible) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onTab);
    return () => window.removeEventListener('keydown', onTab);
  }, [visible]);

  if (!visible) return null;

  const theme = themeStyles[config.theme] ?? themeStyles.forest;
  const isExternal = config.buttonLink.startsWith('http');
  const showImage = config.layout !== 'text-only';
  const showText = config.layout !== 'image-only';
  const imageLeft = config.layout === 'image-first';
  const isImageOnly = config.layout === 'image-only';

  const handleCTAClick = () => {
    close();
    if (!isExternal) {
      navigate(config.buttonLink);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={config.heading}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        className={`relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl shadow-ink/40 animate-popup-enter ${
          isImageOnly ? '' : theme.panel
        }`}
      >
        {/* Close button */}
        {config.showCloseButton && (
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close popup"
            className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink hover:bg-lime transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div
          className={
            showImage && showText && !isImageOnly
              ? `grid grid-cols-1 md:grid-cols-2 ${imageLeft ? '' : 'md:grid-flow-col-dense'}`
              : ''
          }
        >
          {/* Image */}
          {showImage && (
            <div
              className={
                showText && !isImageOnly
                  ? `relative overflow-hidden ${imageLeft ? 'md:order-1' : 'md:order-2'}`
                  : 'relative overflow-hidden'
              }
            >
              {imgError ? (
                <div className="flex aspect-[16/10] md:aspect-auto md:h-full w-full items-center justify-center bg-forest-700">
                  <span className="eyebrow text-paper/40">Campaign artwork unavailable</span>
                </div>
              ) : (
                <img
                  src={config.image}
                  alt={config.imageAlt}
                  className="w-full h-full object-cover max-h-[40vh] md:max-h-none"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          )}

          {/* Text content */}
          {showText && (
            <div
              className={`p-8 md:p-12 flex flex-col justify-center ${isImageOnly ? 'hidden' : ''} ${
                showImage && !imageLeft ? 'md:order-1' : 'md:order-2'
              }`}
            >
              <span className={`eyebrow ${theme.eyebrow}`}>{config.eyebrow}</span>
              <h2 className={`font-display text-3xl md:text-4xl font-bold mt-4 text-balance ${theme.heading}`}>
                {config.heading}
              </h2>
              <p className={`mt-4 text-base leading-relaxed text-pretty max-w-md ${theme.body}`}>
                {config.message}
              </p>

              {config.showButton && (
                <div className="mt-8">
                  {isExternal ? (
                    <a
                      href={config.buttonLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={close}
                      className="btn-primary group"
                    >
                      {config.buttonText}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCTAClick}
                      className="btn-primary group"
                    >
                      {config.buttonText}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
