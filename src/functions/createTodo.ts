import {document} from "../utils/dynamodbClient";

import { v4 as uuid } from "uuid";

import * as dayjs from "dayjs";

interface IRequest {
  title: string,
  deadline: string
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IRequest;

  await document.put({
    TableName: "users_todos",
    Item: {
      id: uuid(),
      user_id,
      title,
      done: false,
      deadline: dayjs(deadline).format("DD/MM/YYYY"),
    }
  }).promise();

  return {
    statusCode: 201
  }
}