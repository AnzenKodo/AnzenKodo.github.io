import { walkSync } from "https://deno.land/std@0.159.0/fs/mod.ts";

async function run(path) {
  const p = Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      path,
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await p.status();

  // Reading the outputs closes their pipes
  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }
}

function runInDir(path) {
  for (const entry of walkSync(path)) {
    if (entry.isDirectory && entry.name.match(/^\_/)) continue;
    run(entry.path);
  }
}

runInDir("home/api");
runInDir("home/pages");
