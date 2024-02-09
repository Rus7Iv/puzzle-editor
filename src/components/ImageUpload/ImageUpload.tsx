import React, { useRef } from 'react';
import './ImageUpload.styles.css';

const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        const maxSize = 1024;
        let width = image.width;
        let height = image.height;

        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height *= maxSize / width;
            width = maxSize;
          } else {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        const canvasResize = document.createElement('canvas');
        canvasResize.width = width;
        canvasResize.height = height;
        const ctxResize = canvasResize.getContext('2d')!;
        ctxResize.drawImage(image, 0, 0, width, height);

        const resizedImage = new Image();
        resizedImage.src = canvasResize.toDataURL();

        resizedImage.onload = () => {
          const size = resizedImage.width / 3;

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              const canvas = document.createElement('canvas');
              canvas.width = size;
              canvas.height = size;
              const ctx = canvas.getContext('2d')!;
              ctx.drawImage(resizedImage, j * size, i * size, size, size, 0, 0, size, size);
              const dataUrl = canvas.toDataURL();
              localStorage.setItem(`image_part_${i}_${j}`, dataUrl);
            }
          }
        };
      };
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current!.click();
  };

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleImageUpload} style={{display: 'none'}} />
      <button className='btn-upload' onClick={handleClick}>
        Загрузить
      </button>
    </>
  );
};

export default ImageUploader;
