const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const PORT = process.env.PORT || 3000;
// Use the directory of this server.js file as the site root so server works
// even if started from a different working directory.
const ROOT = path.resolve(__dirname);
const FILES_DIR = path.join(ROOT, 'files');

function mimeType(f) {
  const ext = String(f).split('.').pop().toLowerCase();
  const map = {
    html: 'text/html; charset=utf-8',
    js: 'application/javascript; charset=utf-8',
    css: 'text/css; charset=utf-8',
    json: 'application/json; charset=utf-8',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    zip: 'application/zip',
    txt: 'text/plain; charset=utf-8'
  };
  return map[ext] || 'application/octet-stream';
}

function humanFileSize(bytes){
  if (bytes === 0) return '0 B';
  const thresh = 1024;
  const units = ['B','KB','MB','GB','TB'];
  let u = 0;
  let val = bytes;
  while(val >= thresh && u < units.length - 1){ val = val / thresh; u++; }
  return (u === 0 ? val : val.toFixed(1)) + ' ' + units[u];
}

async function walkFiles(dir, base = ''){
  const items = [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for(const ent of entries){
    if(ent.name.startsWith('.')) continue;
    const rel = path.join(base, ent.name).split(path.sep).join('/');
    const full = path.join(dir, ent.name);
    if(ent.isDirectory()){
      const sub = await walkFiles(full, rel);
      items.push(...sub);
    } else if(ent.isFile()){
      const stat = await fsp.stat(full);
      items.push({ name: ent.name, rel, size: stat.size });
    }
  }
  return items;
}

const server = http.createServer(async (req, res) => {
  try{
    const url = decodeURIComponent(req.url.split('?')[0]);
    // API for dynamic file listing
    if(url === '/api/files'){
      try{
        await fsp.access(FILES_DIR);
      }catch(e){
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ error: 'files folder not found' }));
        return;
      }
      const items = await walkFiles(FILES_DIR);
      const out = items.map(it => ({
        name: it.name.replace(/\.[^/.]+$/, '').replace(/[\-_]+/g,' ').replace(/\s+/g,' ').trim().replace(/(^|\s)\S/g, t=>t.toUpperCase()),
        path: '/files/' + encodeURI(it.rel),
        type: path.extname(it.name).replace('.', '').toUpperCase(),
        size: humanFileSize(it.size),
        desc: ''
      }));

      // Also update a static manifest files/list.json (relative paths) so static pages can use it
      try{
        const manifest = {
          files: items.map(it => ({
            name: it.name.replace(/\.[^/.]+$/, '').replace(/[\-_]+/g,' ').replace(/\s+/g,' ').trim().replace(/(^|\s)\S/g, t=>t.toUpperCase()),
            path: 'files/' + encodeURI(it.rel),
            type: path.extname(it.name).replace('.', '').toUpperCase(),
            size: humanFileSize(it.size),
            desc: ''
          }))
        };
        await fsp.writeFile(path.join(FILES_DIR, 'list.json'), JSON.stringify(manifest, null, 2), 'utf8');
      }catch(e){
        console.warn('Could not write files/list.json:', e.message || e);
      }

      res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
      res.end(JSON.stringify({ files: out }));
      return;
    }

    // Serve static files
    let fsPath = path.join(ROOT, url);
    // Prevent path traversal
    if(!fsPath.startsWith(ROOT)) fsPath = ROOT;

    let stat;
    try{ stat = await fsp.stat(fsPath); } catch(e){ stat = null; }
    if(stat && stat.isDirectory()){
      // try index.html
      const indexPath = path.join(fsPath, 'index.html');
      try{ await fsp.access(indexPath); fsPath = indexPath; stat = await fsp.stat(fsPath); }
      catch(e){ /* fallthrough */ }
    }

    if(!stat){
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('Not found');
      return;
    }

    const stream = fs.createReadStream(fsPath);
    res.writeHead(200, {'Content-Type': mimeType(fsPath)});
    stream.pipe(res);
  }catch(err){
    console.error('Server error', err);
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Site root: ${ROOT}`);
  console.log(`Serving files from: ${FILES_DIR}`);
});
