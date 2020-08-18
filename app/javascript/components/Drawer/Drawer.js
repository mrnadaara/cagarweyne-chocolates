import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { searchChocolate, signOut } from '../../actions';

import profile from '../../assets/profile.png';
import './Drawer.scss';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.drawerContainerRef = React.createRef();
    this.mainContainerRef = React.createRef();
  }

  search = () => {
    const { searchChocolate } = this.props;
    const { search } = this.state;
    searchChocolate(search);
  }

  signOut = () => {
    const { history, signOut } = this.props;
    signOut();
    history.replace('/signin');
  }

  toggleDrawer = () => {
    const currentToggleState = this.drawerContainerRef.current.classList.contains('show-drawer');
    if (currentToggleState) {
      this.drawerContainerRef.current.classList.remove('show-drawer');
      this.mainContainerRef.current.classList.remove('shorten-main');
    } else {
      this.drawerContainerRef.current.classList.add('show-drawer');
      this.mainContainerRef.current.classList.add('shorten-main');
    }
  }

  render() {
    const { children, username } = this.props;
    return (
      <div className="drawer-container">
        <div ref={this.drawerContainerRef} className="drawer">
          <div>
            <div className="avatar">
              <img src={profile} alt="" />
              <h5>sharmarke</h5>
            </div>
            <ul>
              <li>
                <div>&nbsp;</div>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <div>&nbsp;</div>
                <Link className="link" to="/favourites">
                  Favourites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <hr />
            <button className="link" type="button" onClick={this.signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div ref={this.mainContainerRef} className="main">
          <div className="main-header">
            <div>
              <button onClick={this.toggleDrawer} type="button">
                d
              </button>
            </div>
            <div>title/search box</div>
            <div>
              <button type="button">
                s
              </button>
            </div>
          </div>
          <div className="main-content">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    favourites: PropTypes.number,
  })),
  username: PropTypes.string.isRequired,
  searchChocolate: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  children: PropTypes.elementType.isRequired,
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
      // eslint-disable-next-line react/forbid-prop-types
      state: PropTypes.object,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

Drawer.defaultProps = {
  results: [],
};

const mapStateToProps = ({ chocolates, auth }) => ({
  results: chocolates.query,
  username: auth.username,
});

const mapDispatchToProps = action => bindActionCreators({
  searchChocolate,
  signOut,
}, action);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drawer));
