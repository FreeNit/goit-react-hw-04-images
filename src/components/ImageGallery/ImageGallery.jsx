import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleyItem/ImageGalleryItem';

import { ImageCollection } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { imageCollection } = this.props;

    return (
      imageCollection && (
        <ImageCollection
          className="gallery"
          onClick={this.props.handleImageClick}
        >
          {imageCollection.map(image => (
            <ImageGalleryItem key={image.id} imageData={image} />
          ))}
        </ImageCollection>
      )
    );
  }
}
