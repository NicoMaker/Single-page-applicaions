import { useRef, useState } from 'react'
import './App.css'
import clsx from 'clsx';

function App() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    check: true
  });

  const [formVal, setFormVal] = useState({
    email: false,
    password: false,
    check: false
  });


  const validators = {
    email: value => value.length > 6 && value.includes('@'),
    password: value => value.length > 8,
    check: value => true
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log('ciao', formState);
  }


  function changeHandler(e) {
    let {value, checked, name, type} = e.currentTarget;
    if(type === 'checkbox') {
      value = checked;
    }
    console.log('change', value, name, type);
    setFormState({...formState, [name]: value});

    setFormVal({...formVal, [name]: validators[name](value)});
  }


  return (
    <div className="row m-4">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input value={formState.email} name="email" onChange={changeHandler} type="text" className={clsx('form-control', !formVal.email && 'is-invalid')} id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input value={formState.password} name="password" onChange={changeHandler} type="password" className={clsx('form-control', !formVal.password && 'is-invalid')} id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
          <input checked={formState.check} name="check" onChange={changeHandler} type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default App