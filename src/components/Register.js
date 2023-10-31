import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import * as auth from "./Auth"
function Register(props) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({password: '', email: ''});
  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }
  function handleSubmit(e) {
    e.preventDefault();
    auth.register(formValue.password, formValue.email)
    .then((res) => {
        try { 
          if (res.data) {
          navigate('/sign-in', {replace: true});
          props.handleRegister(true);
        }
      }
      catch(err) {
        props.handleRegister(false);
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((res) => {
      props.openInfoTooltip();
    });
  }
  return (
    <>
      <Header email="" path="sign-in" text="Войти" />
      <Form
        title="Регистрация"
        buttonText="Зарегестрироваться"
        type="register"
        password={formValue.password}
        email={formValue.email}
        onChange={handleChange}
        onSubmit={handleSubmit}
        children={
          <Link className="userform__description" to="/sign-in">
            Уже зарегестрированы? Войти
          </Link>
        }
      />
    </>
  );
}
export default Register;
