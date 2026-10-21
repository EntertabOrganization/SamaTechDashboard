"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "./api";

/** Sends the visitor to the login page when the session has expired. */
export function useSessionGuard() {
  const router = useRouter();
  return useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) router.replace("/login");
    },
    [router],
  );
}

/**
 * Loads `load()` in the browser (the session cookie lives on the API's origin),
 * reloads when `key` changes, and exposes `reload` for after a mutation.
 */
export function useApi<T>(load: () => Promise<T>, key: string) {
  const onError = useSessionGuard();
  const [data, setData] = useState<T | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    load()
      .then((result) => active && setData(result))
      .catch((error) => {
        if (!active) return;
        onError(error);
        console.error(error);
      });
    return () => {
      active = false;
    };
    // `load` is recreated every render; `key` says when the request changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, version, onError]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  return { data, reload };
}

/**
 * Wraps an API mutation as a form action: runs it, reports a failure with a
 * native alert (the dashboard has no toast UI), then reloads the page data.
 */
export function useAction(reload: () => void) {
  const onError = useSessionGuard();
  return useCallback(
    (run: (formData: FormData) => Promise<unknown>) => async (formData: FormData) => {
      try {
        await run(formData);
      } catch (error) {
        onError(error);
        if (!(error instanceof ApiError && error.status === 401)) {
          window.alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        }
      } finally {
        reload();
      }
    },
    [onError, reload],
  );
}
