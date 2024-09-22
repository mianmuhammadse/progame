# Setting up project

There are few prerequisites to get started with promage. To setup the project, you need to have `docker` installed and make sure `nodejs` is setup on the system.

To clone the repo run the following command:

```bash
git clone https://github.com/mianmuhammadse/promage.git
```

The cloned repo will be in the `promage` directory. And it has  `promage-be` and `logger` directory. The project contains a `.env.example` which can used in place of `.env` file.
Once cloned you can run the following command to setup the project:

```bash
cd promage-be

cd promage

npm install

cd ../logger

npm install

cd ../

docker-compose -f compose.dev.yaml up -d
```

After running the commands above, you can access the `main-backend` project on <http://localhost:3000> and you should able to find swagger docs on <http://localhost:3000/api-docs> for the following

- Projects
- Tasks
- Managers

Also if run

```bash
docker ps
```

You will see that we have `backend` and `logger` running along with `postgres` database. Whenever we hit the following APIs

- Creating a project
- Updating a project
- Deleting a project
- Creating a task
- Updating a task
- Deleting a task

The `promage` will generate the notifications to the `project_channel` and `task_channel`. Whenever a notification is sent, `logger` logs the details in a log file in the `logs` directory in `combined.log` file.

The reason we are using PostgreSQL's `NOTIFY` and `LISTEN` instead of event bus or message brokers is because it is a simple and lightweight solution for our use case.

The main goal of this project is to provide a simple example of how to use PostgreSQL's `NOTIFY` and `LISTEN` feature. PostgreSQL notify/listen is a simple way to send notifications between sessions. The `NOTIFY` command sends a notification event to each session that is listening on the named channel. The `LISTEN` command listens for notifications on a named channel.

The main advantage of using PostgreSQL notify/listen is that it is integrated with the database and does not require any additional services to be setup. This makes it a simple and lightweight solution for our use case.

We are using PostgreSQL notify/listen here to send notifications whenever a project or task is created, updated or deleted. The logger service is setup to listen for notifications on the `project_channel` and `task_channel`. Whenever a notification is sent, the logger service logs the details in a log file.

## Architecture and Design

The architecture of the project is based on a simple micro-service architecture. The `promage` is the main service which is responsible for creating, updating and deleting projects and tasks. The `logger` is the second service which is responsible for logging the notifications sent by the `promage` service.

The `promage` service is a simple RESTful API which is written in Node.js using Express.js. The service is responsible for creating, updating and deleting projects and tasks. The service is also responsible for sending notifications to the logger service whenever a project or task is created, updated or deleted.

The `logger` service is a simple RESTful API which is written in Node.js using Express.js. The service is responsible for logging the notifications sent by the `promage` service. The service is also responsible for logging the details of the notifications in a log file in the `logs` directory in the `combined.log` file.

The design of the project is based on the following principles:

- The `promage` service should be responsible for sending notifications to the logger service whenever a project or task is created, updated or deleted.
- The `logger` service should be responsible for logging the notifications sent by the `promage` service.
- The `logger` service should be responsible for logging the details of the notifications in a log file in the `logs` directory in the `combined.log` file.

## Decisions and Tradeoffs

I decided to use PostgreSQL's `NOTIFY` and `LISTEN` feature to send notifications between sessions. The main advantage of using PostgreSQL notify/listen is that it is integrated with the database and does not require any additional services to be setup.

I also decided to use a simple micro-service architecture with two services, `promage` and `logger`. The `promage` service is responsible for creating, updating and deleting projects and tasks. The `logger` service is responsible for logging the notifications sent by the `promage` service.

The reason I decided to use a micro-service architecture is because it is a simple and lightweight solution for our use case. The main advantage of using micro-service architecture is that it is easy to maintain and scale. It also allows for fault tolerance and isolation of the services.
