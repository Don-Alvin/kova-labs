import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Run the real TypeScript modules with isolated environment and service doubles.
export function loadTs(file, { modules = {}, env = {}, fetch, log = () => {} } = {}) {
  const filename = resolve(file);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  const loaded = { exports: {} };
  const require = createRequire(filename);
  runInNewContext(outputText, {
    module: loaded, exports: loaded.exports,
    require: (name) => Object.hasOwn(modules, name) ? modules[name] : require(name),
    process: { env }, fetch, console: { error: log },
    URL, Request, Response, AbortSignal, Buffer,
  }, { filename });
  return loaded.exports;
}
