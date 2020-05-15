const program = require('commander')

// program
//   .version('0.1.0', '-v, --version')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);

// console.log(process.argv)

// console.log(program)

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

/**
 * 先熟悉[process.argv](http://nodejs.cn/api/process.html#process_process_argv)
 * 在上面这个例子中：
 * 如果你在命令行中输入node .\test.js来执行test.js
 *     输出： => you ordered a pizza with: 
 *              - marble cheese；
 * 
 * 如果输入node .\test.js -p 
 *    输出=> you ordered a pizza with:
            - peppers
            - marble cheese
 */

 //可爱的隔------------------------------------------------------------------------

 program
 .version('0.1.0')
 .option('-C, --chdir <path>', 'change the working directory')
 .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 .option('-T, --no-tests', 'ignore test hook');

program
 .command('setup [env]')
 .description('run setup commands for all envs')
 .option("-s, --setup_mode [mode]", "Which setup mode to use")
 .action(function(env, options){
   var mode = options.setup_mode || "normal";
   env = env || 'all';
   console.log('setup for %s env(s) with %s mode', env, mode);
 });

program
 .command('exec <cmd>')
 .alias('ex')
 .description('execute the given remote cmd')
 .option("-e, --exec_mode <mode>", "Which exec mode to use")
 .action(function(cmd, options){
   console.log('exec "%s" using %s mode', cmd, options.exec_mode);
 }).on('--help', function() {
   console.log('');
   console.log('Examples:');
   console.log('');
   console.log('  $ deploy exec sequential');
   console.log('  $ deploy exec async');
 });

program
 .command('*')
 .action(function(env){
   console.log('deploying "%s"', env);
 });

program.parse(process.argv); 