//prerequisite:1. You have a aws account 2. create a dynamodb table 
//This is demo of update data  on AWS dynamodb

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // I am using try catch to handling error.
    // If any error occur in try block then the flow goes to catch block
    try {
        const params = {
            TableName: "YOUR TABLE NAME",
            Key: {
                "partition-key": event['partition-value']
            },
            UpdateExpression: 'set #name = :v1 , #phone_number = :v2',
            ExpressionAttributeNames: {
                "#name":"name",
                "#phone_number":"phone_number"
            },
            ExpressionAttributeValues: {
                ":v1":event['name'],
                ":v2":event['phone_number']
            }
        }
        await dynamodb.update(params).promise(); //update is used for updating data on dynamodb
        return {
            statusCode: 200,
            body: "Data updated successfully"
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
}
