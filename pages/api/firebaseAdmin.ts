const admin = require('firebase-admin');
const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_url: process.env.AUTH_URL,
    token_url: process.env.TOKEN_URL,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
}
export const firebase_admin = admin.apps.length > 0 ? admin.apps[0] : admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://assets-658b7.firebaseio.com'
});
export const db=firebase_admin.firestore();