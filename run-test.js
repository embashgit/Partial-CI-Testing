// const exec =  require('child_process').exec;
const { spawn, exec } = require('node:child_process');
const {echo} = require('shelljs');
const minimist = require("minimist");
const chalk = ("chalk");

const log = console.log;
// const error = chalk.bold.red;
// const debug = chalk.bold.green;
// const info = chalk.rgb(215, 135, 95);

echo("Running Script")
exec("jest -u --colors --changedSince feature/patial-test") //this works fine


function getPRDetails() {
    let prDetails;
exec("gh pr view", (err, stdout, stderr) => {
  if (stderr || err) {
    console.error("Failed to fetch PR details. Install Github CLI and login in order to get base branch / No open PR for this branch");
    return;
  }
  const response = stdout.toString();
  prDetails = response.match(/into (\d+) from (\d+)/i);
});
    return prDetails;
  }
getPRDetails();
  async function fetchBaseBranch(baseBranch) {
    try {
      console.log(`Fetching ${baseBranch} from remote`);
      const addBaseRefs = `git config --add remote.origin.fetch +refs/heads/${baseBranch}:refs/remotes/origin/${baseBranch}`;
      const fetchBase = `git fetch --no-tags origin +refs/heads/${baseBranch}:refs/remotes/origin/${baseBranch}`;
      const command = `${addBaseRefs} && ${fetchBase}`;
      await exec(command);
    } catch (ex) {
      console.log("Failed in fetching changed files", ex);
      return null;
    }
  }

  const argv = minimist(process.argv.slice(2));
  async function getCommand() {
    const [baseBranch, targetBranch] = getPRDetails();
    const shouldUpdateSnapshots = argv["u"];
    const args = ["--colors"];
    if (shouldUpdateSnapshots) {
      args.push("-u");
    }
    args.push("--changedSince", `origin/${baseBranch}`);
    executeCommand(args);
  }

  const liveOuput = (command, args) => {
    const childProcess = spawn(command, args, { shell: true });
    childProcess.stdout.on("data", data => {
      console.log(data.toString());
    });
  
    childProcess.stderr.on("data", data => {
      console.log(data.toString());
    });
  
    childProcess.on("exit", code => {
      console.log("[EXIT CODE]: " + code.toString());
      process.exit(code);
    });
  
    childProcess.on("error", err => {
      console.log("[ERROR]: ", err);
    });
  };