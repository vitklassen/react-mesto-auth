function Login(props) {
  return (
    <div className="preview preview_type_login">
      <h2 className="preview__title">Вход</h2>
      <form
        className="preview__form"
        name="login"
        method="post"
        noValidate
        onSubmit={props.onSubmit}
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
            value={name || ""}
            onChange={handleNameChange}
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
            value={description || ""}
            onChange={handleDescriptionChange}
          />
          <span className="preview__error userEmail-error">1</span>
        </label>
        <button className="preview__save-button" type="submit">
          {props.textSaveButton}
        </button>
      </form>
    </div>
  );
}
export default Login;
