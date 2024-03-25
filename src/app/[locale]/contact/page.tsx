import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export default function Contact({params: {locale}}: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('Index');

  return (
    <div>
        {t('title')}
    </div>
  );
}