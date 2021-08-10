const { admin, auth, verifyFirebaseIdToken } = require("./firebase");
const { getAuthToken } = require("./get-auth-token");

module.exports = { admin, auth, verifyFirebaseIdToken, getAuthToken };
