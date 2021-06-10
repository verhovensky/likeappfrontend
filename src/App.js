import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PublicationsList from './components/PublicationsList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: !!localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      email: '',
      getpubss: '',
    };
  }

  // componentDidMount() {
  //   if (this.state.logged_in) {
  //     fetch('http://localhost:8000/api-auth/get-user/', {
  //       headers: {
  //         Authorization: `bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({ username: json.username });
  //       });
  //   }
  // }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api-auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(JSON.stringify(data))
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        console.log('Token is ', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          email: json.email,
          username: json.username
        });
      });
  };

  handle_publications = (e, data) => {
      console.log('ggg')
    };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    let publications;
    publications = <PublicationsList handle_publications={this.handle_publications} />;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignUpForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        {publications}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default App;