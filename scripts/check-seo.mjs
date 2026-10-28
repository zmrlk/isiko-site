// Static SEO check of the public package (dist/). No network, no dependencies.
// Errors fail the run; warnings are printed with counts and do not fail it.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = 'https://isiko.pl/';
const locales = ['en', 'es', 'de', 'cs', 'sk', 'it', 'lt', 'lv', 'et'];
const errors = [];
const warnings = {};
const warn = (kind, item) => (warnings[kind] ??= []).push(item);

const htmlFiles = [];
(function walk(directory) {
  for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
    const target = path.join(directory, item.name);
    if (item.isDirectory()) walk(target);
    else if (item.name.endsWith('.html')) htmlFiles.push(path.relative(dist, target).split(path.sep).join('/'));
  }
})(dist);

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const named = {amp:'&', quot:'"', apos:"'", lt:'<', gt:'>', nbsp:' '};
const decode = text => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) =>
  code[0] !== '#' ? named[code.toLowerCase()] ?? entity
    : String.fromCodePoint(code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1))));
const pages = {};
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => m[0]);
  const meta = name => metas.find(tag => attr(tag, 'name') === name || attr(tag, 'property') === name);
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
  const url = base + file.replace(/(^|\/)index\.html$/, '$1');
  pages[file] = {
    url,
    locale: locales.includes(file.split('/')[0]) ? file.split('/')[0] : 'pl',
    lang: attr(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang'),
    indexable: file !== '404.html' && !file.endsWith('/404.html') && !/http-equiv="refresh"/i.test(html)
      && !/noindex/i.test(attr(meta('robots') ?? '', 'content') ?? ''),
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() ?? ''),
    description: decode(attr(meta('description') ?? '', 'content') ?? ''),
    canonical: links.filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href')),
    hreflang: links.filter(tag => attr(tag, 'rel') === 'alternate' && attr(tag, 'hreflang'))
      .map(tag => [attr(tag, 'hreflang'), attr(tag, 'href')]),
    headings: [...html.matchAll(/<h([1-6])\b/gi)].map(m => Number(m[1])),
    imagesWithoutAlt: [...html.matchAll(/<img\b[^>]*>/gi)].filter(m => attr(m[0], 'alt') === undefined).length,
    jsonld: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]),
  };
}

const indexable = Object.entries(pages).filter(([, page]) => page.indexable);
const byUrl = new Map(indexable.map(([, page]) => [page.url, page]));
for (const [file, page] of indexable) {
  const fail = message => errors.push(`${file}: ${message}`);
  if (!page.lang?.startsWith(page.locale)) fail(`html lang "${page.lang}" does not match locale ${page.locale}`);
  if (!page.title) fail('missing <title>');
  if (!page.description) fail('missing meta description');
  if (page.canonical.length !== 1 || page.canonical[0] !== page.url) fail(`canonical ${JSON.stringify(page.canonical)} is not ${page.url}`);
  if (page.headings.filter(level => level === 1).length !== 1) fail('expected exactly one <h1>');
  if (page.imagesWithoutAlt) fail(`${page.imagesWithoutAlt} <img> without alt`);
  for (const block of page.jsonld) {
    try { JSON.parse(block); } catch { fail('JSON-LD does not parse'); }
  }
  if (!page.jsonld.length) fail('missing JSON-LD');
  const alternates = new Map(page.hreflang.filter(([, href]) => href?.startsWith(base)));
  if (!alternates.has('x-default')) fail('hreflang without x-default');
  if (alternates.get(page.locale) !== page.url) fail('hreflang without self-reference');
  for (const [code, href] of alternates) {
    if (code === 'x-default') continue;
    const other = byUrl.get(href);
    if (!other) fail(`hreflang ${code} points to a non-indexable or missing page: ${href}`);
    else if (![...other.hreflang].some(([, back]) => back === page.url)) fail(`hreflang ${code} is not reciprocated by ${href}`);
  }

  if (page.title.length > 60) warn('title longer than 60 characters', `${file} (${page.title.length})`);
  if (page.description.length > 160) warn('description longer than 160 characters', `${file} (${page.description.length})`);
  if (page.description.length < 70) warn('description shorter than 70 characters', `${file} (${page.description.length})`);
  if (page.headings.some((level, i) => i && level - page.headings[i - 1] > 1)) warn('heading level skipped', file);
}

for (const field of ['title', 'description']) {
  const seen = new Map();
  for (const [file, page] of indexable) seen.set(`${page.locale}\n${page[field]}`, [...(seen.get(`${page.locale}\n${page[field]}`) ?? []), file]);
  for (const files of seen.values()) if (files.length > 1) errors.push(`duplicate ${field} within one locale: ${files.join(', ')}`);
}

const sitemap = [...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
for (const url of sitemap) if (!byUrl.has(url)) errors.push(`sitemap lists a missing or non-indexable page: ${url}`);
for (const url of byUrl.keys()) if (!sitemap.includes(url)) errors.push(`indexable page missing from sitemap: ${url}`);
if (!/^Sitemap: https:\/\/isiko\.pl\/sitemap\.xml$/m.test(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8'))) errors.push('robots.txt does not point to https://isiko.pl/sitemap.xml');

for (const [kind, items] of Object.entries(warnings)) {
  console.log(`WARN ${kind}: ${items.length} of ${indexable.length} pages`);
  for (const item of items) console.log(`  ${item}`);
}
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  console.error(`FAIL: ${errors.length} SEO errors in ${indexable.length} indexable of ${htmlFiles.length} HTML files.`);
  process.exit(1);
}
console.log(`PASS: ${indexable.length} indexable of ${htmlFiles.length} HTML files, sitemap ${sitemap.length} of ${byUrl.size} pages; canonical, hreflang, h1, alt and JSON-LD checked.`);
