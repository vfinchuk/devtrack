import { env } from '@/core/env';

export const config = {
  appName: env.PUBLIC_APP_NAME,
  isProd: env.NODE_ENV === 'production',
  // pagination: {
  //     defaultPageSize: 20,
  // },
  // features: {
  //     analytics: true
  // }
};
