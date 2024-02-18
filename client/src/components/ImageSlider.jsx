
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {
  const CustomNextArrow = (props) => (
    <div {...props} className="slick-arrow custom-next-arrow" style={{ color: 'red' }}>
      Next
    </div>
  );

  const CustomPrevArrow = (props) => (
    <div {...props} className="slick-arrow custom-prev-arrow" style={{ color: 'red' }}>
      Prev
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
  };
  
  
  
  

  return (
    // <div style={{ width: '50%', height: 'auto' } } className='mx-start'>
    <div className="mx-auto text-center" style={{ maxWidth: '80%' }}>
    {images && images.length > 1 && (
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index} className="text-center">
            {/* Add 'text-center' class to ensure individual slides are centered */}
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
               style={{ width: '100%', height: '400px' }}
            />
          </div>
        ))}
      </Slider>
    )}
    {images && images.length === 1 && (
      <div className="text-center">
        <img
          src={images[0]}
          alt="Single Image"
          style={{ width: '100%', height: '350px', objectFit: 'cover' }}
        />
      </div>
    )}
  </div>
    
  );
 
};

export default ImageSlider;