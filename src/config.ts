import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;

export const pathnames = {
  '/': '/',
  '/contact': {
    en: '/contact',
    de: '/kontakt'
  },
  '/about': {
    en: '/about',
    de: '/uber'
  },
  '/policy': {
    en: '/policy',
    de: '/Datenschutzrichtlinie'
  },
  '/faq': {
    en: '/faq',
    de: '/faq'
  }
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;