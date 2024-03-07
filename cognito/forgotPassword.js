let AWS = require('aws-sdk');

let cognito = new AWS.CognitoIdentityServiceProvider();


let clientID = 'Client-ID';

exports.handler = async (event) => {
    // TODO implement
    //In this we are just sending verification code to the user email.
    try {
        const params = {
            ClientId: clientID,
            Username: event['email']
        };
        console.log(params)
        let data = await cognito.forgotPassword(params).promise();
        console.log(data);
        return {
            statusCode: 200,
            body: "verify code to change password"
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        }
    }
};
