import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { errors } = this.state;

    return(
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Username"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  name="username"
                  onChange={ this.handleInputChange }
                  value={ this.state.email }
              />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </div>
            <div className="form-group">
              <input
                  type="password"
                  placeholder="Password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                  name="password"
                  onChange={ this.handleInputChange }
                  value={ this.state.password }
              />
              { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login User
              </button>
            </div>
          </form>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export  default connect(mapStateToProps, { loginUser })(Login)
