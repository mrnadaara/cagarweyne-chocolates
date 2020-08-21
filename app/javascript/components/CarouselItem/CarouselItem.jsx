import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import './CarouselItem.scss';

const CarouselItem = ({ chocolate, selectChocolate }) => (
  <div className="carousel-container">
    <div className="carousel-content">
      <button onClick={() => selectChocolate(chocolate)} type="button">
        <Image
          cloudName="cagarweyne"
          className="bg-image"
          dpr="auto"
          responsive
          width="auto"
          height="300"
          crop="fill"
          gravity="center"
          responsiveUseBreakpoints="true"
          publicId={`${chocolate.image}.jpg`}
        >
          <Transformation effect="art:hokusai" />
          <Transformation border="3px_solid_rgb:00390b" radius="20" />
        </Image>
      </button>
      <div className="carousel-detail">
        <button onClick={() => selectChocolate(chocolate)} type="button">
          <h3>{chocolate.name}</h3>
        </button>
        <div>
          <i className="fas fa-heart" />
          <span>{chocolate.favourites}</span>
        </div>
      </div>
    </div>
  </div>
);

CarouselItem.propTypes = {
  selectChocolate: PropTypes.func.isRequired,
  chocolate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    favourites: PropTypes.number,
  }).isRequired,
};

export default CarouselItem;
