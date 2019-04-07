const formatMessages = require ('webpack-format-messages');

module.exports = function (compiler) {
  compiler.hooks.invalid.tap ('invalid', function () {
    console.log ('Compiling...');
  });

  compiler.hooks.done.tap ('done', stats => {
    const messages = formatMessages (stats);

    if (!messages.errors.length && !messages.warnings.length) {
      console.log ('Compiled successfully!');
    }

    if (messages.errors.length) {
      console.log ('Failed to compile.');
      messages.errors.forEach (e => console.log (e));
      return;
    }

    if (messages.warnings.length) {
      console.log ('Compiled with warnings.');
      messages.warnings.forEach (w => console.log (w));
    }
  });
};
