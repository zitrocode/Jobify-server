import App from "./app";
import * as db from "./database";
import config from "./config";

db.connect().then(() => console.log("Database connected successfully"));

App.listen(config.port, () => {
  console.info(`Server is running at http://localhost:${config.port}`);
});
