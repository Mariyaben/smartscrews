'use client';

import dynamic from 'next/dynamic';

const InitialLoader = dynamic(() => import('./InitialLoader'), {
  ssr: false,
});

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  return <InitialLoader>{children}</InitialLoader>;
}

