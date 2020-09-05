import { createConnection, Connection } from 'typeorm';
import { User } from 'user/schema';
import { Image } from 'image/schema';

const initializeDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Image],
    synchronize: true,
  });

export default initializeDatabaseConnection;
