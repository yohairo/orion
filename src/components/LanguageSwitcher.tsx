import React, { useEffect, useState } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [path, setPath] = useState('/');
  const [hash, setHash] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isSpanish = path.startsWith('/es');
  const target = isSpanish ? `/` : `/es/`;

  return (
    <a
      href={`${target}${hash}`}
      className="text-white/60 hover:text-primary-400 transition-colors duration-200 text-sm font-medium tracking-wider"
    >
      {isSpanish ? 'EN' : 'ES'}
    </a>
  );
};

export default LanguageSwitcher;
