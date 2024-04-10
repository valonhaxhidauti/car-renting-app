import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;

export const pathnames = {
  '/': '/',
  '/explore': {
    en: '/explore',
    de: '/erkunden'
  },
  '/about': {
    en: '/about',
    de: '/uber'
  },
  '/faq': {
    en: '/faq',
    de: '/faq'
  },
  '/terms': {
    en: '/terms',
    de: '/bedingungen'
  },
  '/policy': {
    en: '/policy',
    de: '/datenschutzrichtlinie'
  },
  '/contact': {
    en: '/contact',
    de: '/kontakt'
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;