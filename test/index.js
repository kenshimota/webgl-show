import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
const __dirname = `/${path.dirname(import.meta.url).replace(/^file:\/\/\//, '')}`;

const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 4500;

// mime files for Content-Type response
const mime = {
  js: 'text/javascript',
  htm: 'text/html',
  html: 'text/html',
  css: 'text/css',
  jpg: 'image/jpg',
  ico: 'image/x-icon',
  mp3: 'audio/mpeg3',
  mp4: 'video/mp4',
};

// init server test
console.log(`Starting Server ${port} ....`);
const server = http.createServer(function (req, response) {
  // get path file name
  const { pathname, query } = url.parse(req.url);
  const folderSplit = pathname.split('/');
  let filePath = '';
  if (folderSplit.length > 1 && folderSplit[1].toLowerCase() == 'src')
    filePath = `${__dirname}/..${pathname}`;
  else
    filePath = pathname == '/' ? `${__dirname}/views/index.htm` : `${__dirname}/views${pathname}`;

  console.log(`read file ${filePath}`);

  // check status file
  fs.stat(filePath, function (error) {
    if (!error) {
      fs.readFile(filePath, (error, content) =>
        getFilePath({ error, filePath, content, status: 200, response })
      );
    } else {
      console.log('Not Found File');
      fs.readFile(`${__dirname}/views/NotFound.htm`, (error, content) =>
        getFilePath({ filePath, status: 404, content, error, response })
      );
    }
  });
});

// read file recibe library fs
const getFilePath = function ({ filePath, response, content, error, status }) {
  try {
    if (!error == false) throw error;

    // response pagine request
    let extension = filePath.split('.');
    extension = extension[extension.length - 1];
    const contentType = !mime[extension] ? 'text/plain' : mime[extension];
    response.writeHead(status, { 'Content-Type': contentType });
    response.write(content);
  } catch (error) {
    console.log({ status, error });
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.write(typeof response == 'object' ? JSON.stringify(error) : error);
  } finally {
    response.end(); // close connection
  }
};

server.listen(port);
console.log(`Started Server ${port}`);
