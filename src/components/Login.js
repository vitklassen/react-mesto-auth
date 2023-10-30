import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import * as auth from "./Auth";
function Login(props) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ password: "", email: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    auth.authorize(formValue.password, formValue.email)
    .then((data) => {
      if(data.token) {
        setFormValue({ password: "", email: "" });
        props.handleLogin();
        navigate('/', {replace: true});
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <Header email="" path="sign-up" text="Регистрация" />
      <Form
        title="Вход"
        buttonText="Войти"
        type="login"
        password={formValue.password}
        email={formValue.email}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
export default Login;
