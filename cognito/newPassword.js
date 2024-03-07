let AWS = require('aws-sdk');

let cognito = new AWS.CognitoIdentityServiceProvider();


let clientID = 'Client-ID';

exports.handler = async (event) => {
    try {
        const params = {
            ClientId: clientID,
            ConfirmationCode: event['verification_code'],
            Password: event['password'],
            Username: event['email']
        };
        console.log(params);
        await cognito.confirmForgotPassword(params).promise();
        return {
            statusCode: 200,
            body: "password changed successfully"
        }
    } catch (e) {
        return {
            statusCode: 200,
            body: e.message
        }
    }
};
