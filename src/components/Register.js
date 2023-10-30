import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import * as auth from "./Auth"
function Register() {
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
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(err)
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
