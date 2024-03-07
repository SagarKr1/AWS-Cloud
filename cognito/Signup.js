let AWS = require('aws-sdk'); 
let cognito = new AWS.CognitoIdentityServiceProvider();



let clientID = 'Clinet-ID';
exports.handler = async (event) => {
    try {
        const cognitoCall = await cognitoRegister(event);
        if(cognitoCall!=true){
            return{
                statusCode:500,
                body:cognitoCall
            }
        }else{
            return{
                statusCode:200,
                body:"Enter code for verification"
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
};


async function cognitoRegister(event) {
    try {
        console.log(event);
        const params = {
            ClientId: clientID,
            Username: event['email'],
            Password: event['password'],
            UserAttributes: [
                {
                    Name: 'email',
                    Value: event['email']
                },
                {
                    Name: 'name',
                    Value: event['name']
                },
                {
                    Name: 'gender',
                    Value: event['gender']
                },
                {
                    Name: 'phone',
                    Value: event['phone']
                }
            ]
        };
        console.log(params);
        let data = await cognito.signUp(params).promise();
        return true;
    } catch (e) {
        return e.message;
    }
}
