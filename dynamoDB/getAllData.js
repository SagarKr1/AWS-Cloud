//prerequisite:1. You have a aws account 2. create a dynamodb table 
//This is demo of get all data  on AWS dynamodb

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // I am using try catch to handling error.
    // If any error occur in try block then the flow goes to catch block
    try {
        const params = {
            TableName: "YOUR TABLE NAME",
        }
        let getall = await dynamodb.scan(params).promise(); //SCAN is used for geting all data from dynamodb
        return {
            statusCode: 200,
            body: getall
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
}
