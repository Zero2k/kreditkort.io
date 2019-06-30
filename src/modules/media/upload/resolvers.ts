import { createWriteStream, unlink } from "fs";
import { ResolverMap } from "../../../types/graphql-utils";
import * as path from "path";

const uploadDir = path.resolve(__dirname, "../../../../public/images");

const processUpload = ({ stream, filename, directory }: any): Promise<any> => {
  const directoryTarget = `${uploadDir}/${directory}/${filename.toLowerCase()}`;
  const path = `${filename.toLowerCase()}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(directoryTarget))
      .on("finish", () => resolve({ path }))
      .on("error", reject)
  );
};

export const resolvers: ResolverMap = {
  Query: {},
  Mutation: {
    async addMedia(_, { file, directory }) {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();

      const { path } = await processUpload({ stream, filename, directory });

      return { filename, path };
    },
    async removeMedia(_, { file, directory }) {
      const directoryTarget = `${uploadDir}/${directory}/${file}`;

      try {
        await unlink(directoryTarget, error => {
          if (error) {
            console.log(error);
            return;
          }
        });
      } catch (error) {
        return false;
      }

      return true;
    }
  }
};
