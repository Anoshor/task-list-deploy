import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crpyto from "crypto";
import axios from 'axios';
import { API_URL } from '../utils';

const client = new DynamoDBClient({ region: "us-west-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { '#name' : "name" },
        ProjectionExpression: "id, #name, completed",
        TableName: "Tasks",
    });

    const response = await docClient.send(command);

    return response;
};

export const createTasks = async ({name, completed}) => {
    const uuid = crpyto.randomUUID();
    const command = new PutCommand({
        TableName: "Tasks",
        Item: {
            id: uuid,
            name,
            completed
        }
    });

    const response = await docClient.send(command);
    return response;
};

export const updateTasks = async ({id, name, completed}) => {
    const command = new UpdateCommand({
        TableName: "Tasks",
        Key: { id },
        ExpressionAttributeNames: { '#name' : "name" },
        UpdateExpression: "SET #name = :name, completed = :completed",
        ExpressionAttributeValues: {
            ":name": name,
            ":completed": completed
        },
        ReturnValues: "ALL_NEW" 
    });

    const response = await docClient.send(command);
    return response;
};

export const deleteTasks = async (id) => {
    const command = new DeleteCommand({
        TableName: "Tasks",
        Key: { id }
    });

    const response = await docClient.send(command);
    return response;
};