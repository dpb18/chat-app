import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup } from '../../Config/firebase'
import { login, resetPass } from '../../Config/firebase'
import { logout } from '../../Config/firebase'
import new_logo from '../../assets/logo_new.png'

const Login = () => {
    const [currState,setCurrState] = useState("Sign Up");
    const[username,setUsername]=useState("");
    const[email,setEmail] =useState("");
    const[password,setPassword] = useState("");

    const onSubmitHandler =(event)=>{
            event.preventDefault();
            if(currState==='Sign Up'){
                signup(username,email,password);
            }
            else{
                login(email,password);
            }
    }

  return (
    <div className='Login'>
        <img src={assets.logo_big} alt='' className='logo'/>
        <form onSubmit={onSubmitHandler} action="" className="login-form">
            <h2>{currState}</h2>
           {currState==='Sign Up'?<input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='Username' className="form-input" required />:null} 
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' className="form-input" required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' className="form-input" required />
            <button type='submit'>{currState==='Sign Up'?'Create Account':'Login Now'}</button>
            <div className="login-term">
                <input type='checkbox'/>
                <p>Agree to the terms and conditions</p>
            </div>
            <div className="login-forgot">
                {currState==='Sign Up'
                ?<p className="login-toggle">Already have an account? <span onClick={()=>{setCurrState('Login')}}>Click Here</span></p>
                :<p className="login-toggle">Don't have an account? <span onClick={()=>{setCurrState('Sign Up')}}>Create Account</span></p>
            }
                {currState === 'Login' ? <p className="login-toggle">Forgot Password?<span onClick={()=>resetPass(email)}> Reset Password</span></p> : null }
                
            </div>
        </form>
    </div>
  )
}

export default Login