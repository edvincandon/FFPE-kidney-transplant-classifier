import React from 'react';

import { Classifier } from './components/classifier/Classifier';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Classifier />
      <Footer />
    </>
  );
};
