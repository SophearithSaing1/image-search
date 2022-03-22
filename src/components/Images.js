import './Images.css';

function Images({ images }) {
  return (
    <div className="images">
      {images.map((img) => (
        <div className="image-container">
          <img
            className="image"
            src={img.urls.regular}
            alt={img.alt_description}
          />
        </div>
      ))}
    </div>
  );
}

export default Images;
