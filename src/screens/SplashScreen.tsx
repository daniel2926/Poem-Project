import { useEffect } from 'react';
import { SPLASH_DURATION } from '../constants';
import { Logo } from '../components/Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

// Brief branded splash that auto-advances to the Home screen.
export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-4 text-center">
      <div className="animate-pulse">
        <Logo size="lg" variant="onDark" />
      </div>
      <p className="mt-5 text-sm text-white/60">Dorm facility &amp; room damage reporting</p>
    </div>
  );
}
