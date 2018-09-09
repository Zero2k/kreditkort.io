import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";

import { createSchema } from "../utils/createSchema";

const typescriptTypes = generateNamespace("GQL", createSchema());

fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescriptTypes,
  err => {
    console.log(err);
  }
);
