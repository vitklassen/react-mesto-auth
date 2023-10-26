import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function App() {
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
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
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((error) => {
      console.log(error);
    })
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => {
        return c._id !== card._id;
      }));
    })
    .catch((error) => {
      console.log(error);
    })
  }
  function handleUpdateUser(newUser) {
    api.setUserInfo(newUser).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
  }
  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar.avatar).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
  }
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
  }
  React.useEffect(() => {
    getUserInfo();
  }, []);
  React.useEffect(() => {
    getAllCards();
  }, []); 
  return (
    <>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/sign-in" replace /> : <Navigate to="/sign-up" replace />}></Route>
        <Route path="/sign-up" element={<Login />}></Route>
        <Route path="/sign-in" element={<Register />}></Route>
      </Routes>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onLikeClick={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
        <div className="popup popup_type_delete-card">
          <div className="popup__container popup__container_type_delete-card">
            <button className="popup__close-button" type="button"></button>
            <h2 className="popup__title popup__title_type_delete-card">
              Вы уверены?
            </h2>
            <button className="popup__save-button button-style" type="button">
              Да
            </button>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
