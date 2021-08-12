const dotenv = require("dotenv");
//const logger = require("loglevel");
dotenv.config();
const {
    NODE_ENV="development",
    MONGO_DB_URL_PRODUCTION,
    MONGO_DB_URL_DEVELOPMENT,
    MONGO_DB_URL_TEST,
    ACCESS_TOKEN_SECRET,
    PORT,
    ENCRYPTION_SALT_DEVELOPMENT,
    ENCRYPTION_SALT_PRODUCTION,
    TYPE,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID,
    AUTH_URI,
    TOKEN_URI,
    AUTH_PROVIDER_X_509_CERT_URL,
    CLIENT_X_509_CERT_URL
}=process.env;

const config = {
    development:{
        app:{
            port:PORT || 4000
        },
        db:{
            url:MONGO_DB_URL_DEVELOPMENT
        },
        
        encrypt:{
            salt:ENCRYPTION_SALT_DEVELOPMENT
        },
        accessToken:{
            tokkenKey:ACCESS_TOKEN_SECRET
        },
        firebase:{
            serviceAcount:{
                type:TYPE,
                project_id:PROJECT_ID,
                private_key_id: PRIVATE_KEY_ID,
                private_key:PRIVATE_KEY,
                client_email:CLIENT_EMAIL,
                client_id:CLIENT_ID,
                auth_uri:AUTH_URI,
                token_uri:TOKEN_URI,
                auth_provider_x509_cert_url:AUTH_PROVIDER_X_509_CERT_URL,
                client_x509_cert_url:CLIENT_X_509_CERT_URL
            }
        }
    },
    test:{
        app:{
            port:PORT || 4000
        },
        db:{
            url:MONGO_DB_URL_TEST
        },
        encrypt:{
            salt:ENCRYPTION_SALT_DEVELOPMENT
        },
        accessToken:{
            tokkenKey:ACCESS_TOKEN_SECRET
        },
        firebase:{
            serviceAcount:{
                type:TYPE,
                project_id:PROJECT_ID,
                private_key_id: PRIVATE_KEY_ID,
                private_key:PRIVATE_KEY,
                client_email:CLIENT_EMAIL,
                client_id:CLIENT_ID,
                auth_uri:AUTH_URI,
                token_uri:TOKEN_URI,
                auth_provider_x509_cert_url:AUTH_PROVIDER_X_509_CERT_URL,
                client_x509_cert_url:CLIENT_X_509_CERT_URL
            }
        }
    },
    production:{
        app:{
            port:PORT || 4000
        },
        db:{
            url:MONGO_DB_URL_PRODUCTION
        },
        encrypt:{
            salt:ENCRYPTION_SALT_PRODUCTION
        },
        accessToken:{
            tokkenKey:ACCESS_TOKEN_SECRET
        },
        firebase:{
            serviceAcount:{
                type:TYPE,
                project_id:PROJECT_ID,
                private_key_id: PRIVATE_KEY_ID,
                private_key:PRIVATE_KEY,
                client_email:CLIENT_EMAIL,
                client_id:CLIENT_ID,
                auth_uri:AUTH_URI,
                token_uri:TOKEN_URI,
                auth_provider_x509_cert_url:AUTH_PROVIDER_X_509_CERT_URL,
                client_x509_cert_url:CLIENT_X_509_CERT_URL
            }
        }
    },
}
module.exports={
    config:config[NODE_ENV]
}