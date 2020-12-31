import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import UserForm from './user-form';
import './common.css';

const ERR_MESSAGE = "A match for the provided email and password could not be found";

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleEmailChange(email) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(password) {
    this.setState({ password: event.target.value });
  }

  async handleLogin() {
    try {
      const resp = await axios.post('/api/login', {
        email: this.state.email,
        password: this.state.password
      });
      this.props.history.push('/');
    } catch (err) {
      if (err.response && err.response.data) {
        this.setState({ message: err.response.data.message })
      } else {
        this.setState({ message: "An unknown error has occurred." })
      }
    }
  }

  render() {
    return (
      <div className="modal">
        <h1>Sign in to access your comments</h1>
        <UserForm
          updateEmail={email => this.handleEmailChange(email)}
          updatePassword={password => this.handlePasswordChange(password)}
          message={this.state.message}
        />
        <div className="user-form-container">
          <button className="submit-button" onClick={() => this.handleLogin()}>Sign In</button>
        </div>
        <div className="register-container">Don't have an account? <Link to="/register.html">register</Link></div>
      </div>
    )
  }

}

export default withRouter(SignIn)
