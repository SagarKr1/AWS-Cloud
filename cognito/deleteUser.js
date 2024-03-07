const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();


let poolID = 'Pool-ID';
exports.handler = async (event) => {
    // TODO implement
    //This function delete user in cognito
    try {
        const params = {
            UserPoolId: poolID,
            Username: event['email']
        };
        console.log(params);
        await cognito.adminDeleteUser(params).promise();
        return {
            statusCode: 200,
            body: "user deleted"
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        }
    }
};
