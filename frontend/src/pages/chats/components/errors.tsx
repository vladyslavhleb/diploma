import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export const CustomErrorTooltip = ({
  show,
  setShow,
  errorMessage,
}: {
  show: boolean;
  errorMessage: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (show && errorMessage) {
      setTimeout(() => setShow(false), 2000);
    }
  }, [show]);

  if (!show) {
    return <></>;
  }
  return (
    <Alert key="danger" variant="danger">
      {errorMessage}
    </Alert>
  );
};
