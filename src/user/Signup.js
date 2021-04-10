import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { signup } from '../auth';
import Layout from'../core/Layout';



// const API = `http://localhost:8000/api/` ;

const Signup = ()=>{

const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error:'',
    success: false

})
const {name, email, password, success, error} = values;

const handleChange = name => event=>{
    setValues({...values, error: false, [name]: event.target.value });
};


const clickSubmit =(e)=>{
    e.preventDefault();
    setValues({...values, error: false });
    signup({name,email, password, error, success })
        .then(data=> {
            if(data.error){
                setValues({...values, error: data.error, success: false })
            } else {
                setValues({...values, name: '',email: '', password:'',error:'',success: true})
            }
        })
}


    const signUpForm = ()=> {
       return <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='name' className='form-control' value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control' value={password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        
        </form>
    };
    

const showError = ()=>(
    <div className='alert alert-danger' style={{display: error? '': 'none'}}>
        {error}
    </div>
)

const showSuccess = ()=> (
    <div className='alert alert-info' style={{display: success ? '': 'none'}}>
        New account is created. Please <Link to='/signin'> Signin</Link>
    </div>
)

    return (        
        <Layout 
            title='Signup' 
            description = 'Signup to curuzaneza react e-commerce App'
            className="container col-md-8 offset-md-2"
            >
            {showSuccess()}
            {showError()}
            {signUpForm()}
              
            {/* {JSON.stringify(values)} */}

        </Layout>
    );
};

export default Signup;
