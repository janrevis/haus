import React from 'react';

class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    this.props.updateEmail(this.state.email);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    this.props.updatePassword(this.state.password);
  }

  render() {
    return (
      <div>
        <div className="user-form-container">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input name="email"
              id="email"
              className="user-input"
              value={this.state.email}
              onChange={event => this.handleEmailChange(event)}/>
            </div>
        </div>
        <div className="user-form-container">
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input type="password"
              name="password"
              id="password"
              className="user-input"
              value={this.state.password}
              onChange={event => this.handlePasswordChange(event)}/>
          </div>
        </div>
        <div className="error-message">{this.props.message}</div>
      </div>
    )
  }

}

export default UserForm
