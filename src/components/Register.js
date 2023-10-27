import { Link } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
function Register() {
  return (
    <>
      <Header email="" path="sign-in" text="Войти" />
      <Form
        title="Регистрация"
        buttonText="Зарегестрироваться"
        type="register"
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
