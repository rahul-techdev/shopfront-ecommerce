import { useContext } from 'react';
import { ToastContext } from '../context/toastContextDef';
import type { ToastContextType } from '../context/toastContextDef';

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
