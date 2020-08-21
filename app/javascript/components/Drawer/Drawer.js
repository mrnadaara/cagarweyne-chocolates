/* eslint-disable react/forbid-prop-types */
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
    const { history, back } = this.props;
    if (back) {
      history.goBack();
    } else {
      const currentToggleState = this.drawerContainerRef.current.classList.contains('show-drawer');
      if (currentToggleState) {
        this.drawerContainerRef.current.classList.remove('show-drawer');
        this.mainContainerRef.current.classList.remove('shorten-main');
      } else {
        this.drawerContainerRef.current.classList.add('show-drawer');
        this.mainContainerRef.current.classList.add('shorten-main');
      }
    }
  }

  render() {
    const {
      children, username, title, path, back,
    } = this.props;
    return (
      <div className="drawer-container">
        <div ref={this.drawerContainerRef} className="drawer">
          <nav>
            <div className="avatar">
              <img src={profile} alt="" />
              <h5>{username}</h5>
            </div>
            <ul>
              <li>
                <div className={path !== 'home' ? 'transparent-link' : ''}>&nbsp;</div>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <div className={path !== 'favourites' ? 'transparent-link' : ''}>&nbsp;</div>
                <Link className="link" to="/favourites">
                  Favourites
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <hr />
            <button className="link" type="button" onClick={this.signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div ref={this.mainContainerRef} className="main">
          <header className="main-header">
            <div>
              <button onClick={this.toggleDrawer} type="button">
                {
                  back ? <i className="fas fa-chevron-left" /> : <i className="fas fa-bars" />
                }
              </button>
            </div>
            <div>
              <p>{title}</p>
            </div>
            <div>
              <button type="button">
                <i className="fas fa-search" />
              </button>
            </div>
          </header>
          { children }
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool,
  path: PropTypes.string,
  username: PropTypes.string,
  searchChocolate: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
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

Drawer.defaultProps = {
  username: '',
  back: false,
  title: 'Chocolates',
  path: 'home',
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
