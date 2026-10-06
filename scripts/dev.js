// Starts `next dev`, adding --webpack only on Next >= 16 (where Turbopack is the default and can't run in Bolt/WebContainers).
// On Next 14/15 the flag is unnecessary (14 rejects it), so this works whichever version a preview environment has installed.
const { spawn } = require("child_process");

const major = parseInt(require("next/package.json").version.split(".")[0], 10);
const bin = require.resolve("next/dist/bin/next");
const args = [bin, "dev", ...(major >= 16 ? ["--webpack"] : []), ...process.argv.slice(2)];

const child = spawn(process.execPath, args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
