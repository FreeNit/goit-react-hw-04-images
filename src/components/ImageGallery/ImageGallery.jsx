import { ImageGalleryItem } from 'components/ImageGalleyItem/ImageGalleryItem';

import { ImageCollection } from './ImageGallery.styled';

export const ImageGallery = ({ imageCollection, handleImageClick }) => {
  return (
    imageCollection && (
      <ImageCollection className="gallery" onClick={handleImageClick}>
        {imageCollection.map(image => (
          <ImageGalleryItem key={image.id} imageData={image} />
        ))}
      </ImageCollection>
    )
  );
};
