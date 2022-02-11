import { promises as fsPromises } from 'fs';
import LogType from './LogTypes';

const log = async (type:LogType, text:string) => {
    const logFile = await fsPromises.open(`${type}Log.txt`, 'a+');
    logFile.write(`${new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'UTC' })} => ${text}\n`);
    await logFile.close();
};

export default log;
