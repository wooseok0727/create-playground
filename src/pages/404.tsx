import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFound404() {
  const router = useRouter();

  useEffect(() => {
    void router.push('/');
  }, [router]);

  return null;
}
