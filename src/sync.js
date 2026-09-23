// GitHub is optional. Credentials stay in this object, in memory only.
export class GitHubConnection {
  #token;
  constructor(token, fetchImpl = fetch) { this.#token = token; this.fetch = fetchImpl; this.user = null; }
  async request(path, options = {}) {
    const response = await this.fetch(`https://api.github.com${path}`, { ...options, headers: {
      Accept:'application/vnd.github+json', Authorization:`Bearer ${this.#token}`, 'X-GitHub-Api-Version':'2026-03-10',
      ...(options.body ? {'Content-Type':'application/json'} : {}) }, cache:'no-store' });
    if (response.status === 409 || response.status === 422) throw new Error('Remote data changed. Reload the remote copy and review the differences before trying again.');
    if (!response.ok) { const error = new Error(response.status===401?'GitHub sign-in failed. Check the token.':response.status===403?'GitHub denied access. Check repository Contents permission or API limits.':`GitHub request failed (${response.status}).`); error.status=response.status; throw error; }
    return response.json();
  }
  async authenticate() { this.user = await this.request('/user'); return this.user; }
  repoPath(repo) { if (!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo)) throw new Error('Use an owner/repository name.'); return '/repos/'+repo; }
  async repository(repo, requirePrivate = false) {
    const metadata=await this.request(this.repoPath(repo));
    if (requirePrivate && metadata.private !== true) throw new Error('Personal synchronization requires a private repository. Nothing was uploaded.');
    if (!metadata.permissions?.push) throw new Error('This account needs write access to the repository.');
    return metadata;
  }
  async readFile(repo,path) {
    try {
      const file=await this.request(`${this.repoPath(repo)}/contents/${path}`);
      if (file.encoding!=='base64' || typeof file.content!=='string') throw new Error('Remote file cannot be read with the Contents API. Use a JSON backup under 1 MB.');
      return {sha:file.sha,text:new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\s/g,'')),c=>c.charCodeAt(0)))};
    } catch (error) { if(error.status===404)return {sha:null,text:null}; throw error; }
  }
  async writeFile(repo,path,text,expectedSha,message,requirePrivate=false) {
    await this.repository(repo,requirePrivate);
    const bytes=new TextEncoder().encode(text);
    if(bytes.length>900_000) throw new Error('Sync payload exceeds 900 KB. Download a JSON backup instead, or remove large photos from the sync copy.');
    const current=await this.readFile(repo,path);
    if(current.sha!==expectedSha) throw new Error('Remote data changed. Reload the remote copy and review it. Nothing was overwritten.');
    let binary=''; for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
    const result=await this.request(`${this.repoPath(repo)}/contents/${path}`,{method:'PUT',body:JSON.stringify({message,content:btoa(binary),...(expectedSha?{sha:expectedSha}:{})})});
    return result.content.sha;
  }
}

export function importMachineSettings(text) {
  if(text.length>1_000_000)throw new Error('Machine settings file is too large.');
  let data;try{data=JSON.parse(text);}catch{throw new Error('Expected a LightBurn JSON .lbset backup. No settings were changed.');}
  if(!Array.isArray(data.Settings))throw new Error('No supported LightBurn Settings array found.');
  const values=new Map(data.Settings.map(row=>[String(row.ID).toLowerCase(),row]));
  const ruida=/^ruida/i.test(data.Name || ''),grbl=/grbl/i.test(data.Name || '');
  if(!ruida&&!grbl)throw new Error('This importer supports Ruida and GRBL JSON backups. Other controllers remain unchanged.');
  const mapping=ruida?{widthMm:'0x26',heightMm:'0x36',xMaxSpeed:'0x23',yMaxSpeed:'0x33',xAcceleration:'0x225',yAcceleration:'0x235'}:
    {widthMm:'0x82',heightMm:'0x83',xMaxSpeed:'0x6e',yMaxSpeed:'0x6f',xAcceleration:'0x78',yAcceleration:'0x79'};
  const changes={controller:ruida?'Ruida':'GRBL'},details=[];
  for(const [field,id] of Object.entries(mapping)) {
    const row=values.get(id);if(!row || typeof row.Value!=='number' || !Number.isFinite(row.Value) || row.Value<=0)continue;
    const converted=grbl&&['xMaxSpeed','yMaxSpeed'].includes(field)?row.Value/60:row.Value;
    changes[field]=converted;details.push({field,value:converted,source:row.Desc,id});
  }
  if(ruida && values.get('0x100003')?.Value==='Glass Tube')changes.source='co2-glass';
  if(!details.length)throw new Error('No supported dimensions or motion settings found.');
  return {changes,details,skipped:data.Settings.length-details.length};
}
