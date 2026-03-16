import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const myToast = (message, type = 'success') => {
  toast(message, {
    type,
    position: 'top-center',
    transition: Zoom,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: false,
     icon: false,   
    theme: 'light'
  });
};
