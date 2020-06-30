import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import './style.css';

class Images extends Component {
  static defaultProps = {
    images: [],
    onClickEach: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ modal: false });
  }

  openModal(index) {
    const { onClickEach, images } = this.props;

    if (onClickEach) {
      return onClickEach({ index, src: images[index] });
    }

    this.setState({ index, modal: true });
  }

  renderOne() {
    const { images } = this.props;
    return images.map((img, i) => (
      <div key={i}
        onClick={this.openModal.bind(this, i)}
        className="col-md-6 col-lg-4 mb-3">
        <div style={{ background: `url('${img}')`, height: '100%' }}
          className="user-images position-relative overflow-hidden rounded img-of-profile-images">
          <div className="image-hover-data">
            <div className="product-elements-icon">
            </div>
          </div>
          {/* <span 
          onClick={this.onRemove}
          className="image-edit-btn">
            <i className="fal fa-trash-alt" />
          </span> */}
        </div>
      </div>
    ));
  }

  render() {
    const { modal, index } = this.state;
    const { images } = this.props;

    return (
      <div className="row">
        {this.renderOne()}
        {modal && (
          <Modal onClose={this.onClose} index={index} images={images} />
        )}
      </div>
    );
  }
}

Images.propTypes = {
  onClickEach: PropTypes.func,
  renderOverlay: PropTypes.func,
};

export default Images;