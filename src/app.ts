import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import routes from "./routes";
import { User } from "./entity/User";
import config from "./config/ormconfig";
// swagger resource import
import * as swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

class App {
  public app: express.Application;
  // init a new express instance
  constructor(){
    this.app = express();
    this.middlewareSetup();
    this.routerSetup();
    this.mysqlSetup();
  }
  // call middleware
  private middlewareSetup() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }
  // set all routes from routes folder
  private routerSetup() {
    this.app.use(routes);
  }

  private mysqlSetup() {
    createConnection(config).then(connection => {
      console.log("Has connected to db?", connection.isConnected);
      let userRepository = connection.getRepository(User);
    }).catch(error => console.log(error));
  }
}

export default new App().app
