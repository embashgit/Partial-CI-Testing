// const exec =  require('child_process').exec;
const sh = require('shelljs');
// import  minimist from "minimist";
// import  chalk from "chalk";

sh.echo("Running Script")
sh.exec("jest -u --colors --changedSince feature/patial-test")
sh.exec("git status")