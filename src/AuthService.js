import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
window.browserHistory = browserHistory;

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    
    this.lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        console.log("ERROR");
        console.log(error);
        return;
      }
      localStorage.setItem('token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('loginType','auth0');
      location.reload();
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('token');
  }
}