const readline = require('readline');

function create_readline_interface() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl;
}

function setup_stdout_echo(in_out_interface) {
  in_out_interface.on('line', (line) => {
    console.log(`Received: ${line}`);
    process.stdout.write('> ');

    if (line === 'exit') {
      console.log('Exiting...');

      done = true;
      process.stdin.unref();
    }
  });
}

function main() {
  const in_out_interface = create_readline_interface();
  setup_stdout_echo(in_out_interface);

  console.log('Type something the console and press enter. It will be echoed back to the console.');
  console.log('Type "exit" <Enter> to terminate the program.');
  process.stdout.write('> ');
}

try {
  main();
} catch (err) {
  let message = `An error occured.`;
  let reason = typeof err === 'string' ? ` Details: ${err}` : typeof err === 'object' ? ` Details: ${err.message}` : ' No additional details were given.';

  console.log(message + reason);
}
