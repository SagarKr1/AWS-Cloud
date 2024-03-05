//prerequisite:1. You have a aws account 2. create a dynamodb table 
//This is demo of get specific data  on AWS dynamodb

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
            }
        }
        const get = await dynamodb.get(params).promise(); //GET is used for get data on dynamodb
        return {
            statusCode: 200,
            body: get
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
}
