'use client';

import { ReactNode } from 'react';
import { toast as sonnerToast, type ExternalToast } from 'sonner';

export type ToastPromiseOptions<TResolve = unknown, TError = unknown> = {
  loading?: ReactNode;
  success?: ReactNode | ((data: TResolve) => ReactNode);
  error?: ReactNode | ((error: TError) => ReactNode);
};

export const notify = {
  success(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.success(message, opts);
  },

  error(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.error(message, opts);
  },

  info(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.info(message, opts);
  },

  warning(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.warning(message, opts);
  },

  loading(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.loading(message, opts);
  },

  message(message: ReactNode, opts?: ExternalToast) {
    return sonnerToast.message(message, opts);
  },

  promise<TResolve, TError = Error>(
    promise: Promise<TResolve> | (() => Promise<TResolve>),
    opts: ToastPromiseOptions<TResolve, TError>,
  ) {
    return sonnerToast.promise<TResolve>(promise, opts);
  },

  dismiss(id?: number | string) {
    return sonnerToast.dismiss(id);
  },
};
