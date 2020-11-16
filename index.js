/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  Client,
  logger,
  Variables,
  File
} = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  workerId: "nodejs-sendtweet",
  maxTasks: 1
};

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'invoiceCreator'
client.subscribe("SendScheduledTweet", async function({ task, taskService }) {
  var datetime = new Date();
  console.log(datetime.toISOString() + ' - start');
  await taskService.complete(task);
  console.log(datetime.toISOString() + ' - das ging aber schnell');
});
