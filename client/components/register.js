import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import UserForm from './user-form';

const ERR_MESSAGE = "A match for the provided email and password could not be found";

class Register extends React.Component {

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

  async handleRegister() {
    try {
      const resp = await axios.post('/api/register', {
        email: this.state.email,
        password: this.state.password
      });
      this.props.history.push('/');
    } catch (err) {
      this.setState({ message: err.response.data.message })
    }
  }

  render() {
    return (
      <div className="modal">
        <h1>Register to access commenting</h1>
        <UserForm
          updateEmail={email => this.handleEmailChange(email)}
          updatePassword={password => this.handlePasswordChange(password)}
          message={this.state.message}
        />
        <div>
          <button className="submit-button" onClick={() => this.handleRegister()}>Register</button>
        </div>
        <div className="signin-container"><Link to="/signin.html">sign in</Link></div>
      </div>
    )
  }

}

export default withRouter(Register)
