/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import { signIn } from '../../actions';

import './Auth.scss';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  submitHandler = event => {
    event.preventDefault();
    const { username } = this.state;
    const { signIn, history } = this.props;
    signIn(username, history);
  };

  inputHandler = event => {
    this.setState({
      username: event.target.value,
    });
  }

  showLoader = () => {
    const { error, loading } = this.props;
    if (loading) {
      return (
        <div className="spinner-border text-danger loader" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (error !== null) {
      return <div className="error-container">{error}</div>;
    }

    return null;
  };

  render() {
    const { username } = this.state;
    return (
      <div className="auth-bg">
        <div className="auth-container">
          <Image
            cloudName="cagarweyne"
            className="bg-image"
            dpr="auto"
            responsive
            width="auto"
            height="1300"
            opacity="8"
            crop="fill"
            gravity="center"
            responsiveUseBreakpoints="true"
            publicId="login_bg.jpg"
          >
            <Transformation effect="art:hokusai" />
            <Transformation border="3px_solid_rgb:00390b" radius="20" />
          </Image>
          <div className="auth-content">
            <div />
            <main className="form-container">
              <form onSubmit={this.submitHandler}>
                <div className="form-header">
                  <h1>Sign In</h1>
                  <h4>Hello there! Sign in and start browsing!</h4>
                </div>
                <input
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={this.inputHandler}
                />
                <button className="shadow-lg" type="submit">Sign In</button>
                { this.showLoader() }
              </form>
            </main>
            <footer className="footer">© 2020 Cagarweyne Chocolates. All rights reserved.</footer>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  signIn: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
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

Auth.defaultProps = {
  error: null,
};

const mapStateToProps = ({ auth }) => {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  const error = auth.error !== null
    ? auth.error.reduce((prev, next) => `${capitalize(prev)} • ${capitalize(next)}`) : null;
  return {
    error,
    loading: auth.loading,
  };
};

const mapDispatchToProps = action => bindActionCreators({
  signIn,
}, action);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
