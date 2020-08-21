/* eslint-disable no-return-assign */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Flickity from 'react-flickity-component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChocolate, fetchFavourites } from '../../actions';
import Drawer from '../Drawer/Drawer';
import CarouselItem from '../CarouselItem/CarouselItem';

import './Favourites.scss';

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    props.fetchFavourites();

    this.state = {
      currentSlide: 1,
    };
  }

  componentDidMount = () => {
    this.flkty.on('settle', () => {
      this.setState({
        currentSlide: this.flkty.selectedIndex + 1,
      });
    });
  }

  selectChocolate = chocolate => {
    const { selectChocolate, history } = this.props;
    selectChocolate(chocolate);
    history.push('/chocolate');
  }

  render() {
    const { list } = this.props;
    const { currentSlide } = this.state;
    return (
      <Drawer title="Favourites" path="favourites">
        <main className="main-content">
          <Flickity
            flickityRef={c => this.flkty = c}
            options={{
              imagesLoaded: true,
              lazyLoad: true,
              freeScroll: true,
              prevNextButtons: true,
              pageDots: false,
            }}
            className="main-carousel"
          >
            {list.map(choc => (
              <CarouselItem
                key={choc.id}
                selectChocolate={chocolate => this.selectChocolate(chocolate)}
                chocolate={choc}
              />
            ))}
          </Flickity>
          <div className="carousel-counter">
            {`${currentSlide}/${list.length}`}
          </div>
        </main>
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
