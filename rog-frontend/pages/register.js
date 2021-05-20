import Layout from '../layouts/Main';
import Link from 'next/link';

import { useState } from 'react';

import { API_URL } from '../utils/urls'

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister() {
        const registerInfo = {
            username: username,
            email: email,
            password: password
        }
    
        const register = await fetch(`${API_URL}/auth/local/register`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        })
    
        const registerResponse = await register.json();
        console.log(registerResponse);
    }

    function validateEmail (email) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexp.test(email)){
            return false;
        }
    }
  
    return (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <a><i className="icon-left"></i> Back to store</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Create an account and discover the benefits</h2>
          <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing 
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          
          <form className="form">
            <div className="form__input-row">
              <input className="form__input" placeholder="Username" type="text" required="required" onChange={e => setUsername(e.target.value) } value={username}/>
            </div>
            
            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="text" required="required" onChange={e => setEmail(e.target.value) } value={email}/>
            </div>
            
            <div className="form__input-row">
              <input className="form__input" type="Password" placeholder="Password" required="required" onChange={e => setPassword(e.target.value) } value={password}/>
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                  <input name="signed-in" type="checkbox" id="check-signed-in" />
                  <span className="checkbox__check"></span>
                    <p>I agree to the Google Terms of Service and Privacy Policy</p>
                </label>
              </div>
            </div>

            <button type="button" className="btn btn--rounded btn--yellow btn-submit" onClick={() => handleRegister() }>Sign up</button>

            <p className="form__signup-link">
              <Link href="/login">
                <a href="#">Are you already a member?</a>
              </Link>
            </p>
          </form>
        </div>

      </div>
    </section>
  </Layout>
)
}

export default RegisterPage
  