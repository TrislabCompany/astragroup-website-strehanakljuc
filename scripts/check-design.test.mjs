import assert from "node:assert/strict";
import { test } from "node:test";
import { designProblems, visibleText } from "./check-design.mjs";

const page = (body) => `<!doctype html><html><head><title>T</title></head><body>${body}</body></html>`;

test("a page that follows the design rules has no problems", () => {
  const html = page('<h1>Prenova strehe</h1><img src="/a.avif" alt="Streha"><img src="/b.avif" alt=""><a href="/x">Prenova strehe</a>');
  assert.deepEqual(designProblems(html), []);
});

test("a style attribute is reported", () => {
  const problems = designProblems(page('<p style="color:red">Besedilo</p>'));
  assert.equal(problems.length, 1);
  assert.match(problems[0], /style attribute/);
});

test("placeholder text is reported, in Slovenian and English", () => {
  assert.match(designProblems(page("<p>Vzorčno besedilo.</p>"))[0], /placeholder text/);
  assert.match(designProblems(page("<p>Lorem ipsum dolor</p>"))[0], /placeholder text/);
  assert.match(designProblems(page("<p>TODO: write</p>"))[0], /placeholder text/);
});

test("placeholder words inside scripts and comments are not visible and are not reported", () => {
  assert.deepEqual(designProblems(page('<!-- TODO --><script type="application/ld+json">{"a":"TBD"}</script><p>Streha</p>')), []);
});

test("an image without alt text is reported", () => {
  assert.match(designProblems(page('<img src="/a.avif">'))[0], /without alt text/);
});

test("a picture shown twice on a page is reported", () => {
  const problems = designProblems(page('<img src="/a.avif" alt="Streha"><img src="/a.avif" alt="Streha">'));
  assert.equal(problems.length, 1);
  assert.match(problems[0], /2 times/);
});

test("a link that only says read more is reported, one with an accessible name is not", () => {
  assert.match(designProblems(page('<a href="/x">Več o tem →</a>'))[0], /doesn't say where it leads/);
  assert.match(designProblems(page('<a href="/x">Read more</a>'))[0], /doesn't say where it leads/);
  assert.deepEqual(designProblems(page('<a href="/x" aria-label="Več o prenovi strehe">Več</a>')), []);
});

test("visible text drops tags and collapses spaces", () => {
  assert.equal(visibleText(page("<h1>Streha</h1>\n  <p>na  ključ</p>")), "Streha na ključ");
});
