import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = props => {
  const handleKeyDown = e => {
    const { hideModal } = props;

    if (e.code === 'Escape') {
      hideModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Overlay onClick={props.onClick}>
      <div className="modal">
        <img src={props.largeimageurl} alt="" />
      </div>
    </Overlay>
  );
};
