import React from 'react';
import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/leiloeiro-logo.png';
import ReactNotification, { store } from 'react-notifications-component';


export default function Logon({ history }) {

  async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await api.post('/login', {
        'username': username,
        'password': password
      });

      if (response.data.auth === true) {
        store.addNotification({
          title: 'Logged In',
          message: 'You are been redirected!',
          type: 'success',
          container: 'top-right',
          insert: 'top',
          dismiss: {
            duration: 500
          },
          onRemoval: () => {
            const data = response.data.data[0];
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('type', data.type);
            history.push('/');
          }
        });
      }
      else {
        alert('Falha no login, tente novamente.');
      }

    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <ReactNotification/>
      <div className="container col-md-3 login-form">
        <div>
          <img src={logoImg} alt="leiloeiro"></img>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-primary">LogIn</button>
        </form>
      </div>
    </div>

  );
}