// Sanity-check: each archetype.pattern must nearest-match itself.
// Also: all-minimum and all-maximum answer sequences should map to
// distinct archetypes (not collapse to the same one).
//
// Run: node scripts/verify-matcher.mjs

import { archetypes } from "../data/archetypes";
import { questions } from "../data/questions";
import { matchArchetype, sumScores, normalizeScores } from "../lib/scoring";

const DIMS = ["life", "ci", "med", "wealth", "aware"];

function euclid(a, b) {
  let s = 0;
  for (const k of DIMS) s += (a[k] - b[k]) ** 2;
  return Math.sqrt(s);
}

// --- Self-match ---
console.log("== Self-match ==");
let selfPass = 0;
for (const a of archetypes) {
  const ranked = archetypes
    .map((x) => ({ id: x.id, d: euclid(a.pattern, x.pattern) }))
    .sort((u, v) => u.d - v.d);
  const ok = ranked[0].id === a.id;
  if (ok) selfPass++;
  console.log(`  ${ok ? "✓" : "✗"} ${a.name} → ${ranked[0].id} (next: ${ranked[1].id} d=${ranked[1].d.toFixed(1)})`);
}
console.log(`  ${selfPass}/${archetypes.length} archetypes self-match\n`);

// --- Answer sequences ---
function pickAnswers(fn) {
  return questions.map((q) => q.options[fn(q)].scores);
}
function showResult(label, answers) {
  const raw = sumScores(answers);
  const norm = normalizeScores(raw);
  const r = matchArchetype(answers);
  console.log(`  ${label}`);
  console.log(`    normalized: ${DIMS.map((k) => `${k}=${norm[k]}`).join(", ")}`);
  console.log(`    → primary: ${r.primary.name} (secondary: ${r.secondary.name})`);
}

console.log("== Answer sequences ==");
showResult("all-A (lowest)", pickAnswers(() => 0));
showResult("all-B (middle)", pickAnswers(() => 1));
showResult("all-C (highest)", pickAnswers(() => 2));
showResult("random mix", pickAnswers((q) => (q.id * 7919) % 3));
