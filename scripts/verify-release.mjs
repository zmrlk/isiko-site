import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const config = JSON.parse(fs.readFileSync(path.join(root, 'wrangler.jsonc'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'release-manifest.json'), 'utf8'));
assert.equal(config.assets.directory, './dist', 'Only the reviewed dist package may be deployed');
assert.equal(config.name, 'isiko-site');
assert.deepEqual(config.routes, [{pattern:'isiko.pl',custom_domain:true}]);
const actual = {};
function walk(directory) {
  for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
    const target = path.join(directory, item.name);
    assert(!item.isSymbolicLink(), 'No links in the public package');
    if (item.isDirectory()) walk(target);
    else {
      assert(item.isFile());
      const relative = path.relative(dist, target).split(path.sep).join('/');
      assert(!/(^|\/)\.(?:env|git)(?:\/|$|\.)|\.(?:sqlite|db|pem|key)$/i.test(relative));
      actual[relative] = createHash('sha256').update(fs.readFileSync(target)).digest('hex');
    }
  }
}
walk(dist);
assert.deepEqual(actual, manifest.files, 'Public package differs from the reviewed manifest');
for (const locale of ['', 'en/', 'es/', 'de/', 'cs/', 'sk/', 'it/', 'lt/', 'lv/', 'et/']) {
  assert(actual[locale + 'index.html'], 'Missing home language: ' + locale);
  const route = locale ? locale + 'dopina/crm/index.html' : 'rozwiazania/dopina-crm/index.html';
  const html = fs.readFileSync(path.join(dist, route), 'utf8');
  assert(html.includes('contact-panel') && html.includes('hello@isiko.pl'), route);
  for (const view of ['leads', 'customers', 'inbox']) {
    assert(html.includes(`data-product-media="${view}"`), route + ': ' + view);
    for (const device of ['desktop', 'mobile']) {
      assert(html.includes(`/assets/cases/current-dopina/${view}-${device}.jpg`), route + ': ' + device);
    }
  }
}
assert(actual['demo/dopina-b2b/index.html']);
assert(actual['404.html'] && actual['_headers'] && actual['_redirects']);
console.log(`PASS: ${Object.keys(actual).length} reviewed public files, ten locales, contact and six CRM images; assets restricted to dist.`);
