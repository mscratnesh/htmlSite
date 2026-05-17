#!/usr/bin/env node
// Generates files/list.json by scanning the `files` directory.
// Run: `node scripts/generate-file-list.js`

const fs = require('fs').promises;
const path = require('path');

const ROOT = path.join(__dirname, '..', 'files');
const OUT = path.join(ROOT, 'list.json');
const IGNORE = new Set(['list.json', 'drive-config.json']);

function humanFileSize(bytes){
  if (bytes === 0) return '0 B';
  const thresh = 1024;
  const units = ['B','KB','MB','GB','TB'];
  let u = 0;
  let val = bytes;
  while(val >= thresh && u < units.length - 1){
    val = val / thresh;
    u++;
  }
  return (u === 0 ? val : val.toFixed(1)) + ' ' + units[u];
}

async function walk(dir, base=""){
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for(const ent of entries){
    const name = ent.name;
    if(name.startsWith('.')) continue; // ignore dotfiles
    if(base === '' && IGNORE.has(name)) continue;
    const rel = path.join(base, name).split(path.sep).join('/');
    const full = path.join(dir, name);
    if(ent.isDirectory()){
      const sub = await walk(full, rel);
      files.push(...sub);
    } else if(ent.isFile()){
      if(IGNORE.has(name)) continue;
      const stat = await fs.stat(full);
      files.push({ name: name, rel: rel, size: stat.size });
    }
  }
  return files;
}

(async ()=>{
  try{
    await fs.access(ROOT);
  }catch(e){
    console.error('Files folder not found at', ROOT);
    process.exit(1);
  }

  try{
    const items = await walk(ROOT);
    // sort by name
    items.sort((a,b)=>a.name.localeCompare(b.name));
    function prettifyName(filename){
      // remove extension
      const noext = filename.replace(/\.[^/.]+$/, '');
      // replace separators with spaces
      const cleaned = noext.replace(/[\-_]+/g, ' ').replace(/\s+/g,' ').trim();
      // Title case
      return cleaned.split(' ').map(w=> w.length? (w[0].toUpperCase()+w.slice(1)) : '').join(' ');
    }

    const out = items.map(it=>({
      name: prettifyName(it.name),
      path: '/files/' + encodeURI(it.rel),
      type: path.extname(it.name).replace('.', '').toUpperCase() || '',
      size: humanFileSize(it.size),
      desc: ''
    }));
    const json = { files: out };
    await fs.writeFile(OUT, JSON.stringify(json, null, 2), 'utf8');
    console.log('Wrote', OUT, 'with', out.length, 'entries');
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();
