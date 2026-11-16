import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  name: "Api.ts",
  fileName: "Api.ts",
  output: resolve(process.cwd(), "./src/api"),
  input: resolve(process.cwd(), "../Web-backend_medicine_Ranson/docs/swagger.json"),
  httpClientType: "axios",
});
