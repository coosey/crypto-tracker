import { LoadingOverlay } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LoadingComponent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Store original body style when component mounts
    const originalStyle = window.getComputedStyle(document.body).overflow;

    const onStart = (url: string) => {
      if (url !== pathname) {
        // Disable scrolling
        document.body.style.overflow = 'hidden';
        setLoading(true);
      }
    };

    const onComplete = () => {
      // Re-enable scrolling
      document.body.style.overflow = originalStyle;
      setLoading(false);
    };

    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onComplete);
    router.events.on('routeChangeError', onComplete);

    return () => {
      // Restore original style on unmount
      document.body.style.overflow = originalStyle;
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onComplete);
      router.events.off('routeChangeError', onComplete);
    };
  }, [pathname, router.events]);

  if (!loading) return null;

  return (
    <LoadingOverlay
      visible={loading}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 1 }}
      loaderProps={{ type: 'dots', color: '#FFC107' }}
    />
  );
}
