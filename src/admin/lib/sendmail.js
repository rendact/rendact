
var Mailgun = require('mailgun').Mailgun;

module.exports = (context, cb) => {
  // POST a JSON with at least the following properties.
  const { changedUser } = context.data;
  var mg = new Mailgun('key-4c6459641d3cce5c6220eb61d7f26c69');
  mg.sendText('admin@rendact.com',
   changedUser.email,
   changedUser.fullName+', Behold the wonderous power of email!',
   {},
   function(err) { err && console.log(err) });
};
