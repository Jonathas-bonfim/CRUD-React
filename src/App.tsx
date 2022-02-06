import { IndexadoresProvider } from './IndexadoresContext';
import { Home } from './pages/home';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './pages/global.scss'
import { useState } from 'react';
import { NewRegisterModal } from './components/NewRegisterModal';


function App() {
  const [isNewRegisterModalOpen, setIsNewRegisterModalOpen] = useState(false);

  function handleOpenNewRegisterModal() {
    setIsNewRegisterModalOpen(true);
  };

  function handleCloseNewRegisterModal() {
    setIsNewRegisterModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <IndexadoresProvider >
        <NewRegisterModal
          isOpen={isNewRegisterModalOpen}
          onRequestClose={handleCloseNewRegisterModal}
        />
        <Home onOpenNewTransactionModal={handleOpenNewRegisterModal} />
        <ToastContainer />
      </IndexadoresProvider>
    </>
  );
}
export default App;
