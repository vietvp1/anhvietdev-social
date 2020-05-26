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
    return images.map((img,i) => (
      <div key={i}
          onClick={this.openModal.bind(this, i)}
          className="col-md-6 col-lg-4 mb-3">
            <div style={{ background: `url('${img}')`, height: '100%' }} 
              className="user-images position-relative overflow-hidden rounded img-of-profile-images">
              <div className="image-hover-data">
                  <div className="product-elements-icon">
                  <ul className="d-flex align-items-center m-0 p-0 list-inline">
                      <li className="text-white"> 60<i className="ri-thumb-up-line" /></li>
                      <li className="text-white">&nbsp; 30<i className="ri-chat-3-line" /></li>
                      <li className="text-white">&nbsp; 10<i className="ri-share-forward-line" /></li>
                  </ul>
                  </div>
              </div>
              <a href="/#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" data-original-title="Edit or Remove"><i className="ri-edit-2-fill" /></a>
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