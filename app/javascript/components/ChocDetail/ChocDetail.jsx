import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFav } from '../../actions';
import Drawer from '../Drawer/Drawer';

import './ChocDetail.scss';

const ChocDetail = ({ selectedChoc, toggleFav }) => (
  <Drawer title={selectedChoc.name} back path="chocolate">
    <div className="choc-container">
      <Image
        cloudName="cagarweyne"
        className="bg-image"
        dpr="auto"
        responsive
        width="auto"
        height="500"
        crop="fill"
        gravity="center"
        responsiveUseBreakpoints="true"
        publicId={`${selectedChoc.image}.jpg`}
      >
        <Transformation effect="art:hokusai" />
        <Transformation border="3px_solid_rgb:00390b" radius="20" />
      </Image>
      <div className="choc-content">
        <h3>About this chocolate</h3>
        <p>{selectedChoc.description}</p>
      </div>
      <button
        className={selectedChoc.isFavourited ? 'unliked' : ''}
        type="button"
        onClick={toggleFav}
      >
        <i className="fas fa-heart" />
        {selectedChoc.isFavourited ? ' Unlike' : ' Like'}
      </button>
    </div>
  </Drawer>
);

ChocDetail.propTypes = {
  selectedChoc: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    favourites: PropTypes.number,
    isFavourited: PropTypes.bool,
  }).isRequired,
  toggleFav: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chocolates }) => ({
  selectedChoc: chocolates.selectedChoc,
});

const mapDispatchToProps = action => bindActionCreators({
  toggleFav,
}, action);

export default connect(mapStateToProps, mapDispatchToProps)(ChocDetail);
