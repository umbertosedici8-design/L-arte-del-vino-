/* Dove stanno i dati.
   Su Netlify usa i Blobs (niente database da configurare, è già incluso).
   In locale, se i Blobs non ci sono, scrive dentro la cartella dati/.
   Le due strade si comportano uguale, così quello che provi sul tuo computer
   è esattamente quello che succede online. */

const LOCALE = "./dati";
let blobs = null;

/* consistency "strong": chi legge vede SUBITO quello che un altro ha appena scritto.
   Con quella di serie (eventual) una modifica può metterci fino a 60 secondi a
   comparire ovunque: due clienti potevano prendere gli ultimi posti insieme. */
async function store() {
  if (blobs !== null) return blobs;
  try {
    const { getStore } = await import("@netlify/blobs");
    blobs = getStore({ name: "prenotazioni", consistency: "strong" });
  } catch {
    blobs = false;                     // nessun Netlify: si va di file
  }
  return blobs;
}

/* Un secondo cassetto, separato dalle prenotazioni: le visite al sito.
   Stessa interfaccia (leggi, scrivi, elenca, cancella), stessa scelta Netlify/file. */
const cassetti = new Map();
export function cassetto(nome) {
  if (cassetti.has(nome)) return cassetti.get(nome);
  let st = null;
  const apri = async () => {
    if (st !== null) return st;
    try { const { getStore } = await import("@netlify/blobs"); st = getStore({ name: nome, consistency: "strong" }); }
    catch { st = false; }
    return st;
  };
  const cartella = async () => {
    const fs = await import("node:fs/promises"), path = await import("node:path");
    return { fs, path, base: path.join(LOCALE, "_" + nome) };
  };
  const c = {
    async leggi(k, difetto = null) {
      const s = await apri();
      if (s) { const v = await s.get(k, { type: "json" }); return v ?? difetto; }
      const { fs, path, base } = await cartella();
      try { return JSON.parse(await fs.readFile(path.join(base, safe(k) + ".json"), "utf8")); } catch { return difetto; }
    },
    async scrivi(k, v) {
      const s = await apri();
      if (s) return s.setJSON(k, v);
      const { fs, path, base } = await cartella();
      const f = path.join(base, safe(k) + ".json");
      await fs.mkdir(path.dirname(f), { recursive: true });
      await fs.writeFile(f, JSON.stringify(v));
    },
    async elenca(prefisso) {
      const s = await apri();
      if (s) { const { blobs: b } = await s.list({ prefix: prefisso }); return b.map((x) => x.key); }
      const { fs, path, base } = await cartella();
      /* in locale: si legge la cartella più vicina e si filtra per prefisso */
      const fine = prefisso.lastIndexOf("/");
      const dir = fine >= 0 ? prefisso.slice(0, fine + 1) : "";
      const giu = async (d) => {
        let out = [];
        try {
          for (const e of await fs.readdir(path.join(base, safe(d) || "."), { withFileTypes: true })) {
            if (e.isDirectory()) out = out.concat(await giu(d + e.name + "/"));
            else if (e.name.endsWith(".json")) out.push(d + e.name.slice(0, -5));
          }
        } catch {}
        return out;
      };
      return (await giu(dir)).filter((k) => k.startsWith(prefisso));
    },
    async cancella(k) {
      const s = await apri();
      if (s) return s.delete(k);
      const { fs, path, base } = await cartella();
      try { await fs.unlink(path.join(base, safe(k) + ".json")); } catch {}
    }
  };
  cassetti.set(nome, c);
  return c;
}

async function fsMod() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  await fs.mkdir(path.join(LOCALE, "prenotazioni"), { recursive: true });
  return { fs, path };
}

const safe = (k) => String(k).replace(/[^A-Za-z0-9_\-/.]/g, "_").replace(/\.{2,}/g, "_").replace(/^\/+/, "");

export async function leggi(chiave, difetto = null) {
  const s = await store();
  if (s) {
    const v = await s.get(chiave, { type: "json" });
    return v ?? difetto;
  }
  const { fs, path } = await fsMod();
  try {
    return JSON.parse(await fs.readFile(path.join(LOCALE, safe(chiave) + ".json"), "utf8"));
  } catch {
    return difetto;
  }
}

export async function scrivi(chiave, valore) {
  const s = await store();
  if (s) return s.setJSON(chiave, valore);
  const { fs, path } = await fsMod();
  const f = path.join(LOCALE, safe(chiave) + ".json");
  await fs.mkdir(path.dirname(f), { recursive: true });
  await fs.writeFile(f, JSON.stringify(valore, null, 2));
}

export async function elenca(prefisso) {
  const s = await store();
  if (s) {
    const { blobs: b } = await s.list({ prefix: prefisso });
    return b.map((x) => x.key);
  }
  const { fs, path } = await fsMod();
  const dir = path.join(LOCALE, safe(prefisso));
  try {
    const f = await fs.readdir(dir);
    return f.filter((x) => x.endsWith(".json")).map((x) => prefisso + x.slice(0, -5));
  } catch {
    return [];
  }
}

export async function cancella(chiave) {
  const s = await store();
  if (s) return s.delete(chiave);
  const { fs, path } = await fsMod();
  try { await fs.unlink(path.join(LOCALE, safe(chiave) + ".json")); } catch {}
}

/* tutte le prenotazioni, in una botta sola */
export async function tutte() {
  const chiavi = await elenca("prenotazioni/");
  const out = [];
  for (const k of chiavi) {
    const p = await leggi(k);
    if (p) out.push(p);
  }
  return out.sort((a, b) => (a.data + a.ora).localeCompare(b.data + b.ora));
}
