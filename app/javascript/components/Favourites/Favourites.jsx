/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  CarouselProvider, Slider, Slide,
} from 'pure-react-carousel';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChocolate, fetchFavourites } from '../../actions';
import Drawer from '../Drawer/Drawer';
import CarouselItem from '../CarouselItem/CarouselItem';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Favourites.scss';

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    props.fetchFavourites();
  }

  selectChocolate = chocolate => {
    const { selectChocolate, history } = this.props;
    selectChocolate(chocolate);
    history.push('/chocolate');
  }

  render() {
    const { list } = this.props;
    return (
      <Drawer title="Favourites" path="favourites">
        <div className="main-content">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={list.length}
            style={{
              flex: 1,
            }}
          >
            <Slider
              style={{
                height: '100%',
              }}
            >
              {list.map((choc, index) => (
                <Slide key={choc.id} index={index}>
                  <CarouselItem
                    selectChocolate={chocolate => this.selectChocolate(chocolate)}
                    chocolate={choc}
                  />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
      </Drawer>
    );
  }
}

Favourites.propTypes = {
  selectChocolate: PropTypes.func.isRequired,
  fetchFavourites: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    favourites: PropTypes.number,
  })).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ favourites }) => ({
  list: favourites.list,
});

const mapDispatchToProps = action => bindActionCreators({
  selectChocolate,
  fetchFavourites,
}, action);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favourites));
