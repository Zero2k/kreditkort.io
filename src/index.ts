import { createServer } from './createServer';

createServer().catch((err) => {
  console.log(err);
});
