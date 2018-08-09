

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();


const FirebaseApi = new function () {

    auth.onAuthStateChanged((user) => {
        if (authStateChangeEvent !== null) {
            authStateChangeEvent(user);
        }
    });

    this.signIn = async () => {

        try {
            await auth.signInWithPopup(provider);
            // // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;
            // // ...
            alert('로그인 되었습니다');
        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert('로그인 error');
        }
    };

    this.signOut = () => {
        auth.signOut().then(function () {
            // Sign-out successful.
            alert('로그아웃 되었습니다');

        }).catch(function (error) {
            // An error happened.
            alert('로그아웃 error');
        });
    };


    let authStateChangeEvent = null;
    this.onAuthStateChange = (callback) => {
        authStateChangeEvent = callback;
    };


    return this
};

