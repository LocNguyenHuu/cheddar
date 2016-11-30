import React from 'react';
import {browserHistory} from 'react-router';

/* -----------------    COMPONENT     ------------------ */

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(localStorage.token) {
      // browserHistory.push('/video')
    }
    $('select').material_select();
  }

  render() {
    return (
      <div className="signin-container">
        <div className="errorContainer">
        {location.hash === '#failed' ? <span> Sign Up Unsuccessful. Perhaps the email was already used. </span> : null}
        </div>
        <div className="buffer local">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input
                      name="password"
                      type="text"
                      className="form-control"
                      required
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary green lighten-1">Signup</button>
            </form>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { signup } = this.props;
    const credentials = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    signup(credentials);

  }
}


/* OAuth code that was inside Render which can be put back

<div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>


*/
