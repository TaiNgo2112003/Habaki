import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.argv[2]||'.');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    let filename=resolve(root,'.'+decodeURIComponent(url.pathname));
    if(filename!==root&&!filename.startsWith(root+sep)){res.writeHead(403).end();return;}
    if((await stat(filename)).isDirectory())filename=resolve(filename,'index.html');
    const data=await readFile(filename);
    res.writeHead(200,{'Content-Type':mime[extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Không tìm thấy trang');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
