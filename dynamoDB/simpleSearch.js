var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    try {
        var params = {
            TableName: 'TableName',
            FilterExpression: "(begins_with(#name,:val))",
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            ExpressionAttributeValues: {
                ":val":event['key']
            }
        };
        const user = await dynamodb.scan(params).promise();
        console.log(user);
        return {
            statusCode: 200,
            body: user
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
};
