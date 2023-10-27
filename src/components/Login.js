import Header from "./Header";
import Form from "./Form";
function Login() {
  return (
    <>
      <Header email='' path='sign-up' text='Регистрация'/>
      <Form title="Вход" buttonText="Войти"  type="login"/>
    </>
  );
}
export default Login;
