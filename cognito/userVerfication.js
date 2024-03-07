let AWS = require('aws-sdk');
let cognito = new AWS.CognitoIdentityServiceProvider();


let clientID = 'Client-ID';
exports.handler = async (event) => {
    try {
        const verification = await userVerification(event);
        if(verification!=true){
            return{
                statusCode:500,
                body:verification
            }
        }else{
            return{
                statusCode:200,
                body:"user Verified successfully"
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
};


async function userVerification(event) {
    try {
        const params = {
            ClientId: clientID,
            Username: event['email'],
            ConfirmationCode: event['verification_code']
        };
        console.log(params);
        let verify = await cognito.confirmSignUp(params).promise();
        return true;
    } catch (e) {
        return e.message
    }
}
