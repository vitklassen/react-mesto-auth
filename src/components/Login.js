import Header from "./Header";
function Login() {
  return (
    <>
      <Header email='' path='sign-up' text='Войти'/>
      <div className="preview preview_type_login">
        <h2 className="preview__title">Вход</h2>
        <form
          className="preview__form"
          name="login"
          method="post"
          noValidate
        >
          <label className="preview__form-field">
            <input
              className="preview__input preview__input_name_userEmail"
              type="email"
              name="userEmail"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              id="userEmail"
            />
            <span className="preview__error userEmail-error">1</span>
          </label>
          <label className="preview__form-field">
            <input
              className="preview__input preview__input_name_password"
              type="text"
              name="password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              id="password"
            />
            <span className="preview__error userEmail-error">1</span>
          </label>
          <button className="preview__save-button" type="submit">
            '123'
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
