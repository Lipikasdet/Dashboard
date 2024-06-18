const admin = require('firebase-admin');
const serviceAccount = require('../../adminAccount.json');

export const firebase_admin = admin.apps.length > 0 ? admin.apps[0] : admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://assets-658b7.firebaseio.com'
});
export const db=firebase_admin.firestore();
export const field_Value=admin.firestore.FieldValue;


