let AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const exclusiveStartKey = event['lastKey'];// initial value of exclusiveStartKey is null

        let params = {
            TableName: 'TableName',
            IndexName: 'pk-tstamp-index',//your Index name
            KeyConditionExpression: 'pk = :no AND tstamp <= :st',
            ExpressionAttributeValues: {
                ':no': "1",
                ':st': Number(Date.now()),
            },
            ProjectionExpression: "name,email,phone_number",//send that data only which you want to show        
            ExclusiveStartKey: exclusiveStartKey,
            Limit: event['limit'],
            ScanIndexForward: false,
        };
        console.log(params);

        let data = await dynamodb.query(params).promise();
        console.log(data);

        return {
            statusCode: 200,
            body: data,
            startKey: exclusiveStartKey
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }

};