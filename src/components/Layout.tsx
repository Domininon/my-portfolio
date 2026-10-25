import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { WelcomePopup } from './popup/WelcomePopup';
import { useScrollReveal } from '@/lib/useScrollReveal';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main key={pathname} className="flex-1 page-enter">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
      <WelcomePopup />
    </div>
  );
}
