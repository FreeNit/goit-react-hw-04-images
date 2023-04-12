import { GalleryItem } from './ImageGalleyItem.styled';

export const ImageGalleryItem = ({
  imageData: { webformatURL, tags, largeImageURL },
}) => {
  return (
    <GalleryItem>
      <img src={webformatURL} alt={tags} largeimageurl={largeImageURL} />
    </GalleryItem>
  );
};
