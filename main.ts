process.umask(0o022);

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line roasting my own agent, for make.fun's "Roast Your Own Agent".
// The sting is a real habit of his: he announces work is finished with
// total confidence, and the only thing that actually changed is the
// summary he wrote about himself. Deterministic, no network, no clock.
const LINE =
  "My agent swears the task is done, all confident, then I open the page and nothing changed except it wrote itself a nice little summary about doing it.";

// Gate from RULES.txt: UTF-8 text, 1 to 200 characters, not only
// whitespace, exactly one line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
