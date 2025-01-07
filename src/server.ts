import config from './app/config';
import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//node js process run on event driven architecture , so we are listening the process for unhandledRejection , if its happen then
process.on('unhandledRejection', () => {
  console.log('unhandledRejection detected , Shutting down the server');
  //we are checking if any process are running on server or not if then
  if (server) {
    //we are closing all our server if there any process are running
    server.close(() => {
      //then we are stopping our process
      process.exit(1);
    });
  }
  //if no process running on server
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException detected , Shutting down the server');
  process.exit(1);
});
