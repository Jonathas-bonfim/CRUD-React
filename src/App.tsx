import { IndexadoresProvider } from './IndexadoresContext';
import { Home } from './pages/home';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './pages/global.scss'


function App() {

  return (
    <>
      <IndexadoresProvider >
        <Home />
        <ToastContainer />
      </IndexadoresProvider>
    </>
  );
}
export default App;
