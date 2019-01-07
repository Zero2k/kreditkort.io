import { ResolverMap } from "../../../types/graphql-utils";
import * as bluebird from 'bluebird';
import * as path from "path";

interface IDirectory{
    filePath: string;
    isFileBoolean: boolean;
    files: [string];
}

interface IFile{
    filePath: string;
    name: string;
    isFileBoolean: boolean;
}

const fsPromise: any = bluebird.promisifyAll(require('fs'));

export const resolvers: ResolverMap = {
    Query: {
        getFiles: async () => {
            const pathToMedia = path.join(__dirname, "../../../../public/images");

            const func = async (dir: any) => {
                const arrayOfFileNameStrings = await fsPromise.readdirAsync(dir);
                const fileArray = arrayOfFileNameStrings.map(async (fileName: string) => {
                    const fullPath = `${dir}/${fileName}`;
                    const directoryData = await fsPromise.statAsync(fullPath);
                    const directory = {} as IDirectory
    
                    if (directoryData.isDirectory()) {
                        directory.filePath = fullPath;
                        directory.isFileBoolean = directoryData.isFile();
                        directory.files = await fsPromise.readdirAsync(fullPath).map(async (fileName: string) => {
                            const filePath = `${directory.filePath}/${fileName}`;
                            const fileData = await fsPromise.statAsync(filePath);
                            const file = {} as IFile
                            file.filePath = filePath;
                            file.name = fileName;
                            file.isFileBoolean = fileData.isFile()
                            return file;
                        });
                    }
                    return directory;
                });
                return Promise.all(fileArray);
            }
            
            try {
                console.log(await func(pathToMedia));
            } catch (err) {
                console.log(err);
            }
        }
    }
}