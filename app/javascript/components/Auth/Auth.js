import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Cloudinary } from 'cloudinary-core';
import { Image, Transformation } from 'cloudinary-react';
import { signIn } from '../../actions';

import './Auth.scss';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.cloudinary = new Cloudinary({ cloud_name: 'cagarweyne', secure: true });
  }

  render() {
    return (
      <div className="auth-bg">
        <div className="auth-container">
          {/* <picture>
            <source media="(max-width: 350px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_350/v1597671991/login_bg.jpg" />
            <source media="(max-width: 450px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_450/v1597671991/login_bg.jpg" />
            <source media="(max-width: 541px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_541/v1597671991/login_bg.jpg" />
            <source media="(max-width: 780px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_780/v1597671991/login_bg.jpg" />
            <source media="(max-width: 810px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_810/v1597671991/login_bg.jpg" />
            <source media="(max-width: 980px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_980/v1597671991/login_bg.jpg" />
            <source media="(max-width: 1200px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_1200/v1597671991/login_bg.jpg" />
            <source media="(min-width: 1201px)" srcSet="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_2000/v1597671991/login_bg.jpg" />
            <img className="bg-image" src="https://res.cloudinary.com/cagarweyne/image/upload/f_auto,c_fill,h_1000,o_22,w_2000/v1597671991/login_bg.jpg" alt="" />
          </picture> */}
          <Image
            cloudName="cagarweyne"
            className="bg-image"
            dpr="auto"
            responsive
            width="auto"
            height="1000"
            opacity="8"
            crop="fill"
            responsiveUseBreakpoints="true"
            publicId="login_bg.jpg"
          >
            <Transformation effect="art:hokusai" />
            <Transformation border="3px_solid_rgb:00390b" radius="20" />
          </Image>
          <div className="auth-content">
            <div />
            <div className="form-container">
              <form>
                <div className="form-header">
                  <h1>Sign In</h1>
                  <h4>Hello there! Sign in and start browsing!</h4>
                </div>
                <input placeholder="Username" type="text" />
                <button className="shadow-lg" type="submit">Sign In</button>
              </form>
            </div>
            <div className="footer">© 2020 Cagarweyne Chocolates. All rights reserved.</div>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = action => bindActionCreators({
  signIn,
}, action);

export default connect(null, mapDispatchToProps)(Auth);
