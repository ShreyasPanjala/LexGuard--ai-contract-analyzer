import { useState, useCallback } from 'react';

/**
 * useToast — manages a stack of toast notifications.
 *
 * Returns:
 *  - toasts: Array of { id, message, type }
 *  - addToast(message, type?, duration?) → id
 *  - removeToast(id)
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 4500) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast]
  );

  return { toasts, addToast, removeToast };
}
