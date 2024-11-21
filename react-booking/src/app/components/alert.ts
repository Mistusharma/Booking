
import Swal from 'sweetalert2';

interface SweetAlertProps {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
}

const useSweetAlert = () => {
  const showAlert = ({
    title,
    text,
    icon,
    confirmButtonText = 'OK',
  }: SweetAlertProps) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  };

  return showAlert;
};

export default useSweetAlert;
