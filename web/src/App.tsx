import React from 'react';

import { ClassifierInputs } from './components/classifier/ClassifierInputs';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <ClassifierInputs />
      <Footer />
    </>
  );
};
