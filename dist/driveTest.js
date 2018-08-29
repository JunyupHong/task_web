'use strict';

FirebaseApi1.onAuthStateChange(function (user) {
    if (user) {
        $('#loginButton').css('display', 'none');
        $('#logoutButton').css('display', 'block');

        db.collection("users").get().then(function (querySnapshot) {
            var isSame = false;
            querySnapshot.forEach(function (doc) {
                if (doc.id === user.uid) {
                    FirestoreApi.updateUser(user);
                    isSame = true;
                }
            });
            if (!isSame) {
                FirestoreApi.storeUser(user);
            }
        });
    } else {
        $('#loginButton').css('display', 'block');
        $('#logoutButton').css('display', 'none');
    }
});
$('#loginButton').on('click', FirebaseApi1.signIn);

$('#logoutButton').on('click', FirebaseApi1.signOut);