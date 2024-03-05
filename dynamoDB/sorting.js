var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    try {
        var params = {
            TableName: 'TableName',
            IndexName: 'Pk-tstamp-index',//your partition key
            KeyConditionExpression: 'Pk = :no AND tstamp <= :st',
            // FilterExpression: "(begins_with(#name,:val))",
            // ExpressionAttributeNames: {
            //     '#name': 'name'
            // },
            ExpressionAttributeValues: {
                ':no': "1",
                ':st': Number(Date.now()),
            }
        };
        var user = await dynamodb.query(params).promise();
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
