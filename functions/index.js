const functions = require("firebase-functions");
const admin = require("firebase-admin");
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// var serviceAccount = require("/cooking-forum-firebase-adminsdk-9qcbv-609acad68a.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://cooking-forum-default-rtdb.firebaseio.com"
// });

admin.initializeApp({
    projectId: "cooking-forum",
    databaseURL: "http://localhost:9000/?ns=cooking-forum-default-rtdb",
})

exports.writeToDb = functions.auth.user().onCreate((user) => {
    const newUser = {
        admin: false,
        name: "",
        photo: ""
    }

    console.log(newUser);

    admin.database().ref(`/users/${user.uid}`).set(newUser).then(() => {
        console.log(`Success save new user to database!`);
    }).catch((error) => {
        console.log(`Fail to save new user to database! Error: ${error}`);
    })
});

exports.updateUserDb = functions.database.ref(`/users/{userId}`).onCreate((snapshot, context) => {
    admin
        .auth()
        .getUser(context.params.userId)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            let name = "";
            if (userRecord.displayName != null) name = userRecord.displayName;
            let photo = "https://firebasestorage.googleapis.com/v0/b/cooking-forum.appspot.com/o/userProfileImage%2Fuser_profile_placeholder.png?alt=media&token=4e9824f7-99cd-4907-8c20-b339b8bd07e7";
            if (userRecord.photoURL != "") photo = userRecord.photoURL;

            const newUser = {
                name: name,
                photo: photo,
                admin: false
            }

            admin
                .auth()
                .updateUser(context.params.userId, {
                    emailVerified: true,
                    displayName: name,
                    photoURL: photo,
                })
                .then((userRecord) => {
                    console.log(newUser);
                    admin.database().ref(`/users/${context.params.userId}`).set(newUser).then(() => {
                        console.log(`User ${context.params.userId} save!`);
                        return true;
                    }).catch((error) => {
                        console.log(`User ${context.params.userId} not save!`);
                        return false;
                    })
                })
                .catch((error) => {
                    console.log('Error updating user:', error);
                });


        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
            return false
        });
})

exports.deleteuser = functions.auth.user().onDelete((user) => {
    admin.database().ref(`/users/${user.uid}`).remove().then(() => {
        console.log(`Success delete user to database!`);
        return true;
    }).catch((error) => {
        console.log(`Fail to delete user to database! Error: ${error}`);
        return false;
    })
});
