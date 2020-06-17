import firebase from 'firebase/app';
//This utility is used for authentication
import 'firebase/auth'; 
//Firebase has many util libraries which we will not to use all but at this stage we will need two
//This utility ius used to save to the database CHECK!
import 'firebase/firestore';

const config  = {
    apiKey: "AIzaSyAbf__HtEZuHchb20zaCHb_5Oo33IUk7Q8",
    authDomain: "clothing-shop-2b253.firebaseapp.com",
    databaseURL: "https://clothing-shop-2b253.firebaseio.com",
    projectId: "clothing-shop-2b253",
    storageBucket: "clothing-shop-2b253.appspot.com",
    messagingSenderId: "218376645684",
    appId: "1:218376645684:web:d348daab7eff0c273eee61",
    measurementId: "G-483F3KTLLF"
}

firebase.initializeApp(config); //When this script it run, it should initize firebase using these credentials;

/**
 * This line of code below 
 */
export const createUserProfileDocument = async (userAuth, additionalInformation) => { //Additional information is any information which will be required
    if (!userAuth) return; //If the user is null (the user ius the user from the App file)
    //Note that this user does not exist; this is only for trial
    //firestore.doc('user/f98ylknsdf');
    //console.log(firestore.doc('user/f98ylknsdf')); //This will return the reference object in that location. This is a *queryref* example
    //Note that this user does not exist
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {displayName, email} = userAuth; //Get the user name, and email address
        const createdAt = new Date();  //Create a time stamp for when the email was created
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log('Error creating user: ', error);
        }

    }
    return userRef;
}

export const auth = firebase.auth(); //This contains information about the authenticated/active user (Id the user is not signed in then there will be nothing) 
export const firestore = firebase.firestore();

/*There are may authentication methods in firebase.
* We will use google
* This is setting up the google authentication tool
*/

const provider = new firebase.auth.GoogleAuthProvider(); //Gives us access to the google authentication class (Therefore there are come functions which we will use along with this)

provider.setCustomParameters({promt:'select_account'});

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}
export default firebase;
//This function will not be called again vecause the items have already been pushed into the database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log('collectionRef: ', collectionRef);
    //Beacause all the sets to a collection or a document are sent one at a time:
    /**
     * Let;s say we are sending a collections of an array, therefore:
     * if it fails at index 0, the rest of the array will 
     * have already been commuted. This is solved using the batch function from the firestore
     */
    //Batch is a function (e.g) transactions in mysql whe
    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
        //In the cide below, we can specify the id. e.g. object.title ; but we will not do that so that firebase can select that for us
        // const newDocRef =  collectionRef.doc(object.title); //Return the document and send the reference object
        const newDocRef =  collectionRef.doc(); //Return the document and send the reference object
        batch.set(newDocRef, obj);
    })
    // Now that the request have been batched we can psh to the database
    return await batch.commit(); //This will return a promise. If commit is succesful, it will return a void/null callue
}

export const convertSnapShopToObject = (collections) => {
    const transformCollections = collections.docs.map(collection => {
        const {title, items} = collection.data();
        return {
            routeName: encodeURI(title.toLowerCase()),         //encodeURL is a function in Javascript which converts a name string e.g. Arabic to a UTL which the browser can understand
            id: collection.id,
            items,
            title
        }
    });
    return transformCollections.reduce((acc, crv) => {
        acc[crv.title.toLowerCase()] = crv;
        return acc;
    } ,{})

}