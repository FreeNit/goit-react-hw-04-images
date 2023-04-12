import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = props => {
  // -> Simulate componentDidMount
  useEffect(() => {
    const handleKeyDown = e => {
      const { hideModal } = props;

      if (e.code === 'Escape') {
        hideModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // -> Simulate ComponentWillUnmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  return (
    <Overlay onClick={props.onClick}>
      <div className="modal">
        <img src={props.largeimageurl} alt="" />
      </div>
    </Overlay>
  );
};
