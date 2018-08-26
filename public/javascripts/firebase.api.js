

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


const store = firebase.firestore();

const settings = { timestampsInSnapshots: true };
store.settings(settings);
// authChange , 할때 listener가 필요하다
// 따라서 public 이외에 내부에 필요한 객체 혹은 자료가 있다
const FirebaseDB = {
  createUser: async (user) => {
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().getTime(),
      signAt: new Date().getTime(),
    };
    return await store.collection('users').doc(user.uid).set(data);
  },
  signUser: async (user) => {
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      signAt: new Date().getTime(),
    };
    return await store.collection('users').doc(user.uid).update(data);
  },
  readUser: async (uid) => {
    // 데이터가 어디에 있다 라고 위치 설정만 하는것
    const refUser = store.collection('users').doc(uid);
    // query, 여러 주소를 한번에 조회할 때
    // 실제로 get을 수행할때 데이터를 조회한다.
    const doc = await refUser.get();
    if (doc.exists) return doc.data();
    else return null;
  },

};

const FirebaseApi = new function() {
  let listener = null;

  function setOnAuthStateChanged(callback) {
    listener = callback;
  }

  auth.onAuthStateChanged(async (user) => {
    if(_.isNil(user)){
      if (!_.isNil(listener)) listener(null);
      return;
    }
    console.log(user);

    let u = await FirebaseDB.readUser(user.uid);
    if (_.isNil(u)) {
      await FirebaseDB.createUser(user);
      u = await FirebaseDB.readUser(user.uid);
    } else {
      await FirebaseDB.signUser(user);
      u = await FirebaseDB.readUser(user.uid);
    }

    if (!_.isNil(listener)) listener(u);

  });

  return {
    signIn: async () => await auth.signInWithPopup(provider),
    signOut: async () => await auth.signOut(),
    setOnAuthStateChanged,
  };
};

