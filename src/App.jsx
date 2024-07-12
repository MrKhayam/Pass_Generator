import React from 'react';
import PassCont from './components/PassCont';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-zinc-900">
      <PassCont />
      <Toaster/>
      </div>
    </>
  );
}

export default App;
