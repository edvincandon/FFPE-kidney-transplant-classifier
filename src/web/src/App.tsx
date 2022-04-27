import React from 'react';

import { ClassifierInputs } from './components/ClassifierInputs';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <ClassifierInputs />
      <Footer />
    </>
  );
};
