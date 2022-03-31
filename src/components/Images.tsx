import classes from './Images.module.css';
import { ImageList, ImageListItem } from '@mui/material';
import Image from '../types/Image';

interface Props {
  images: Image[];
}

const Images: React.FC<Props> = ({ images }) => {
  return (
    <ImageList className={classes.images}>
      {images.map((img) => (
        <ImageListItem className={classes['image-container']} key={img.id}>
          <img
            className={classes.image}
            src={img.urls.regular}
            alt={img.alt_description}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Images;
