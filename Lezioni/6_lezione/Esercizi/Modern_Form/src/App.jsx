import { useRef, useState } from 'react'
import './App.css'
import clsx from 'clsx';
import {useForm} from 'react-hook-form'

function App() {

  const {register, handleSubmit, formState, watch} = useForm();
  const {errors} = formState;

  console.log('ciccio', watch());

  const pippo = (e) => {
    console.log('submit', e);
  }

  const rgx = /^\w+@\w+\.\w+$/gi;

  const passwordValidator = (e) => {
    const match = e.includes('ciao');
    console.log(match);
    return match ? 'il campo contiene \'ciao\'' : null;
  }

  function inputClass(fieldName) {
    return clsx({'form-control': true, 'is-invalid': errors[fieldName]});
  }


  function strong() {
    const value = watch('password').length;
    if(value > 15) {
      return 'fortissima';
    } 

    if(value > 7) {
      return 'forte';
    }

    return 'debole';
  }

  return (
    <div className="row m-4">
      <form onSubmit={handleSubmit(pippo)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input {...register('email', {required: true, pattern: rgx})} className={inputClass('email')} type="text" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input {...register('password', {required: true, minLength: 4, validate: passwordValidator})} className={inputClass('password')}  type="password" id="exampleInputPassword1"/>
          <h3>{strong()}</h3>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default App