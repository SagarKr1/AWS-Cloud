let AWS = require("aws-sdk");
let cognito = new AWS.CognitoIdentityServiceProvider();


let ClientId = "Client-ID";


exports.handler = async (event) => {
    try {
        const params = {
            ClientId: ClientId,
            Username: event['email']
        };
        await cognito.resendConfirmationCode(params).promise();
        return {
            statusCode: 200,
            body: "Code resend",
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message,
        };
    }
};