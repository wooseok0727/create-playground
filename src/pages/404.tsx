import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const NotFound404 = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push('/');
  }, [router]);

  return null;
};
