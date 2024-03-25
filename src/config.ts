import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;

export const pathnames = {
  '/': '/',
  '/contact': {
    en: '/contact',
    de: '/kontakt'
  }
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;