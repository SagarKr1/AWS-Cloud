let AWS = require('aws-sdk');
let cognito = new AWS.CognitoIdentityServiceProvider();


let clientID = 'Client-ID';

exports.handler = async (event) => {
    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: clientID,
            AuthParameters: {
                USERNAME: event['email'],
                PASSWORD: event['password']
            }
        };

        let data = await cognito.initiateAuth(params).promise();
        return {
            statusCode: 200,
            body: data
        };

    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
};
