import { useApp } from './AppContext';

export const useLanguage = () => {
  const { language, toggleLanguage, t } = useApp();
  return { language, toggleLanguage, t };
};
