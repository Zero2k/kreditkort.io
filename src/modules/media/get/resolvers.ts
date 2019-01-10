import { ResolverMap } from "../../../types/graphql-utils";
import * as bluebird from 'bluebird';
import * as path from "path";

interface IDirectory{
    directory: string;
    filePath: string|undefined;
    files: [string];
}

interface IFile{
    filePath: string|undefined;
    name: string;
}

const fsPromise: any = bluebird.promisifyAll(require('fs'));

export const resolvers: ResolverMap = {
    Query: {
        getFiles: async () => {
            const pathToMedia = path.join(__dirname, "../../../../public/images");

            const call = async (dir: any) => {
                const arrayOfFileNameStrings = await fsPromise.readdirAsync(dir);
                const fileArray = arrayOfFileNameStrings.map(async (fileName: string) => {
                    const fullPath = `${dir}/${fileName}`;
                    const directory = {} as IDirectory
    
                    directory.directory = fileName;
                    directory.filePath = `${'static'}/${fullPath.split("/public/").pop()}`;
                    directory.files = await fsPromise.readdirAsync(fullPath).map(async (fileName: string) => {
                        const filePath = `${fullPath}/${fileName}`;
                        const file = {} as IFile
                        file.filePath = `${'static'}/${filePath.split("/public/").pop()}`;
                        file.name = fileName;
                        return file;
                    });

                    return directory;
                });
                return Promise.all(fileArray);
            }
            
            return call(pathToMedia);
        }
    }
}