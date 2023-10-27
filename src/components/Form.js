function Form(props) {
  return (
    <div className={`userform userform_type_${props.type}`}>
      <h2 className="userform__title">{props.title}</h2>
      <form className="userform__form" name="userform" method="post" noValidate>
          <input
            className="userform__input userform__input_name_userEmail"
            type="email"
            name="userEmail"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            id="userEmail"
          />
          <input
            className="userform__input userform__input_name_password"
            type="text"
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
            id="password"
          />
        <button className="userform__save-button" type="submit">
          {props.buttonText}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default Form;