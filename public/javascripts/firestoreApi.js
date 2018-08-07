// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");


// firebase.initializeApp({
//     apiKey: '### FIREBASE API KEY ###',
//     authDomain: '### FIREBASE AUTH DOMAIN ###',
//     projectId: '### CLOUD FIRESTORE PROJECT ID ###'
// });


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


const FirestoreApi = new function () {
    this.store = function (user) {
        db.collection("users").doc(user.uid).set({
            name: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
            lastLogin: user.metadata.lastSignInTime,
            creationTime: user.metadata.creationTime
        }).then(console.log("Document written with ID: ", user.uid))
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    };

    this.update = function (user) {
        db.collection("users").doc(user.uid).update({
            lastLogin: user.metadata.lastSignInTime,
            creationTime: user.metadata.creationTime
        }).then(console.log("Document successfully updated!"));
    };
    // this.store = async (user) => {
    //     try {
    //         await db.collection("users").doc(user.uid).set({
    //             name: user.displayName,
    //             photoUrl: user.photoURL,
    //             email: user.email,
    //             lastLogin: user.metadata.lastSignInTime,
    //             creationTime: user.metadata.creationTime
    //         });
    //         console.log("Document written with ID: ", user.uid);
    //     }
    //     catch (error) {
    //         console.error("Error adding document: ", error);
    //     }
    //
    // };
    //
    // this.update = async (user) => {
    //     await db.collection("users").doc(user.uid).update({
    //         lastLogin: user.metadata.lastSignInTime,
    //         creationTime: user.metadata.creationTime
    //     });
    //     console.log("Document successfully updated!");
    //
    // };


    return this;
};