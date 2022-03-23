import './Images.css';
import { ImageList, ImageListItem } from '@mui/material';

function Images({ images }) {
  return (
    <ImageList className="images">
      {images.map((img) => (
        <ImageListItem className="image-container" key={img.id}>
          <img
            className="image"
            src={img.urls.regular}
            alt={img.alt_description}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Images;
