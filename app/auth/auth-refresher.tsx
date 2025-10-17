"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface AuthRefresherProps {
  shouldRefresh: boolean;
  refreshAuthentication: () => Promise<{ value?: string } | null>;
}

/**
 * Client component that triggers the `refreshAuthentication` server action when the server render detects
 * a missing or expired session (signaled via `shouldRefresh`). A successful refresh reloads the page
 * to pick up the newly set cookies; otherwise the user is redirected to the login screen.
 */
export default function AuthRefresher({
  shouldRefresh,
  refreshAuthentication,
}: AuthRefresherProps) {
  const router = useRouter();

  useEffect(() => {
    if (!shouldRefresh) {
      return;
    }

    let canceled = false;

    const refresh = async () => {
      try {
        const refreshed = await refreshAuthentication();

        if (canceled) {
          return;
        }

        if (refreshed?.value) {
          router.refresh();
          return;
        }

        router.replace('/auth/login');
      } catch (error) {
        console.error('Failed to refresh authentication', error);
      }
    };

    refresh();

    return () => {
      canceled = true;
    };
  }, [shouldRefresh, router]);

  return null;
}
