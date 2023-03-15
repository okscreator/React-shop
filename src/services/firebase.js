import { initializeApp } from "firebase/app";
import { getAuth, updateEmail } from 'firebase/auth'
import { getDatabase, ref, set, onValue, push, child } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBU_ZciAuk-2ZjDISns1IIpGcJJBvw3Rgg",
  authDomain: "react-shop-f4b14.firebaseapp.com",
  projectId: "react-shop-f4b14",
  storageBucket: "react-shop-f4b14.appspot.com",
  messagingSenderId: "628260170468",
  appId: "1:628260170468:web:d64193b07f15d26c5c5af1",
  databaseURL: "https://react-shop-f4b14-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const db = getDatabase(app);


// получить всю информацию о пользователе
export const getUserValue = (user) => {
  const uid = user.uid;
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'users/' + uid), (data) => {
        const dataUser = data.val();
        resolve(dataUser)
    }, (error) => {
      reject(error)
    }
    )
  })
}

//записать e-mail 
export const writeUserEmail = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/email'), {
    email: user.email,
  });
}

//изменить e-mail 
export const editUserEmail = (id, email, onError, setLoading) => {
  
  updateEmail(firebaseAuth.currentUser, email).then(() => {
    console.log('Email updated!')
    set(ref(db, 'users/' + id + '/email'), {
      email: email,
    });
  }).catch((error) => {
    switch (error.code) {
      case "auth/requires-recent-login":
        onError("Для изменения e-mail необходимо обновить данные об авторизации");
        break;
      default:
        onError(error.message);
        break;
    }
  })
  .finally(()=> {
    setLoading(false)
  }
  )
}

//записать имя
export const writeUserName = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/name'), {
    name: user.displayName,
  });
}

//изменить имя
export const editUserName = (id, name) => {
  set(ref(db, 'users/' + id + '/name'), {
    name: name,
  });
}

//изменить телефон
export const editUserPhone = (id, phone) => {
  set(ref(db, 'users/' + id + '/phone'), {
    phone: phone,
  });
}


//отправить отзыв
export const editUserComment = (id, name, rating, comment, card ) => {
  const newCommentKey = push(ref(db, 'users/' + id + '/comments/'));
  set(newCommentKey, {
    name: name,
    rating: rating, 
    comment: comment, 
    card: card
  });
  set(push(ref(db, 'commentsList/')), {
    name: name,
    rating: rating, 
    comment: comment, 
    card: card
  });
}

//записать статус подписки
export const writeUserSubscribe = (id, subscribe) =>   {
  
  set(ref(db, 'users/' + id + '/subscribe'), {
    subscribe: subscribe
  });
}

//добавить пользователя в список подписавшихся
export const writeSubscribeList = (id, email) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: email
  });
}

//удалить пользователя из списка подписавшихся
export const deliteInSubscribeList = (id) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: null
  });
}

//отправить заявку от авторизованного пользователя
export const writeUserApplication = (id, idApplication, card, date) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication), {
    card: card,
    date: date
  });
}

//удалить заявку от авторизованного пользователя
export const deliteUserApplication = (id, idApplication) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication ), {
    application: null
  });
}

//указать статус для заявки от авторизованного пользователя
export const writeUserApplicationStatus = (id, idApplication, status) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication + '/status'), {
    status: status
  });
}

//отправить заявку без авторизации
export const writeApplicationWithoutLogin = (idApplication, name, phone, card, email) => {
  set(ref(db, 'applicationsWithoutLogin/'+idApplication), {
    name: name,
    phone: phone,
    card: card,
    email: email
  });
}