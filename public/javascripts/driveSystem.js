// var config = {
//     apiKey: "AIzaSyBV_YkYMkXhGPIXQ3pnAl2zH6293hC2Waw",
//     authDomain: "drivesystem-d4e36.firebaseapp.com",
//     databaseURL: "https://drivesystem-d4e36.firebaseio.com",
//     projectId: "drivesystem-d4e36",
//     storageBucket: "drivesystem-d4e36.appspot.com",
//     messagingSenderId: "381167381795"
// };
// firebase.initializeApp(config);
//
// console.log(firebase);
//
//
// // 계속해서 firebsae.auto()를 쓰기 귀찮으므로 auth에 받아서 씀
// const auth = firebase.auth();
//
// // auth provider
// const provider = new firebase.auth.GoogleAuthProvider();
//
//
// const FirebaseApi = new function () {
//
//     auth.onAuthStateChanged((user) => {
//         // firebase에 대한 로직만 처리!! (다른건 listener를 만들어 처리)
//         if(authStateChangeEvent !== null) {
//             authStateChangeEvent(user);
//         }
//     });
//     let authStateChangeEvent = null;
//
//     this.onAuthStateChange = (callback) => {
//         authStateChangeEvent = callback;
//     };
//
//     this.signIn = () => {
//
//
//         // Promise => 성공했을 경우 then, 실패했을 경우 catch
//
//         // 로그인 함수 (jQuery에서 로그인 버튼이 눌리면 이 함수를 실행!)
//         // firebase document에서 가져옴
//         auth.signInWithPopup(provider).then(function (result) {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = result.credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             // ...
//         }).catch(function (error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//             // ...
//         });
//     };
//
//     this.signOut = () => {
//         auth.signOut().then((ret)=> {
//             console.log(ret);
//         });
//     };
//
//     return this;
// };
//
// FirebaseApi.onAuthStateChange(user => {
//     // firebase에 대한 로직만 처리해야함!!!!!
//     if(user) {
//         //user is signed in
//     }
//     else {
//         //no user is signed in
//     }
// });
//
//
// $('#loginButton').on('click', FirebaseApi.signIn);


FirebaseApi.onAuthStateChange(user => {
    if (user) {
        $('#loginButton').css('display', 'none');
        $('#logoutButton').css('display', 'block');

        db.collection("users").get().then((querySnapshot) => {
            let isSame = false;
            querySnapshot.forEach((doc) => {
                if(doc.id === user.uid) {
                    FirestoreApi.update(user);
                    isSame = true;
                }
            });
            if(!isSame) {
                FirestoreApi.store(user);
            }
        });
    }
    else {
        $('#loginButton').css('display', 'block');
        $('#logoutButton').css('display', 'none');

    }
});
$('#loginButton').on('click', FirebaseApi.signIn);

$('#logoutButton').on('click', FirebaseApi.signOut);


