//prerequisite:1. You have a aws account 2. create a dynamodb table 
//This is demo of inserting data  on AWS dynamodb

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // I am using try catch to handling error.
    // If any error occur in try block then the flow goes to catch block
    try {
        const params ={
            TableName:"YOUR TABLE NAME",
            Item:{
                "name":event['name'],
                "email":event['email'],
                "phone_number":event['phone_number'],
                "address":event['address']
            }
        }
        await dynamodb.put(params).promise(); //PUT is used for inserting data on dynamodb
        return{
            statusCode:200,
            body:"Data Create successfully"
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
}
