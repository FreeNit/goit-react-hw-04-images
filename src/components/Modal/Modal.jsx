import { Component } from 'react';
import { Overlay } from './Modal.styled';

export class Modal extends Component {
  handleKeyDown = e => {
    const { hideModal } = this.props;

    if (e.code === 'Escape') {
      hideModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Overlay onClick={this.props.onClick}>
        <div className="modal">
          <img src={this.props.largeimageurl} alt="" />
        </div>
      </Overlay>
    );
  }
}
