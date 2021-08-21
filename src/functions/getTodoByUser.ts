import {document} from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: "users_todos",
    FilterExpression: "user_id = :id",
    ExpressionAttributeValues: {
      ":id": user_id
    }
  }).promise();

  const userTodos = response.Items;

  if(userTodos) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        userTodos
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Usuário não existe ou não possui um todo"
    })
  }
}