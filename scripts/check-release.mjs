import { readFile, appendFile } from 'node:fs/promises';

const { name, version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
// Only stable versions go to latest. Prereleases need an explicit release policy.
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Expected a stable version, got ${version}`);
const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`, {
  signal: AbortSignal.timeout(30_000),
});
if (response.status !== 404 && !response.ok) {
  throw new Error(`Registry lookup failed: ${response.status}`);
}
const publish = response.status === 404;
console.log(`${name}@${version}: ${publish ? 'ready to publish' : 'already published; skipping'}`);
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `publish=${publish}\n`);
