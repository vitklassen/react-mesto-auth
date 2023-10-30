import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import DeleteCardPopup from "./DeleteCardPopup";
import api from "../utils/Api";
import * as auth from "./Auth"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    visible: false,
    link: "",
    name: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const handleEditAvatarClick = () => {
    setEditAvatar(true);
  };
  const handleEditProfileClick = () => {
    setEditProfile(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlace(true);
  };
  const closeAllPopups = () => {
    setEditAvatar(false);
    setAddPlace(false);
    setEditProfile(false);
    setSelectedCard({ visible: false, link: "", name: "" });
  };
  const handleCardClick = (link, name) => {
    setSelectedCard({ visible: true, link: link, name: name });
  };
  const getUserInfo = () => {
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllCards = () => {
    api
      .getAllCards()
      .then((response) => {
        setCards(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateUser(newUser) {
    api
      .setUserInfo(newUser)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .editAvatar(newAvatar.avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleLogin() {
    setLoggedIn(true);
  }
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){ 
      auth.tokenCheck(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/', {replace: true});
        }
      })
    }
  }
  React.useEffect(() => {
    getUserInfo();
  }, []);
  React.useEffect(() => {
    getAllCards();
  }, []);
  React.useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onLikeClick={handleCardLike}
                  onCardDelete={handleCardDelete}
                  userEmail={userEmail}
                />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onLikeClick={handleCardLike}
                    onCardDelete={handleCardDelete}
                    userEmail={userEmail}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}></Route>
          <Route path="/sign-up" element={<Register />}></Route>
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
        <DeleteCardPopup />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
