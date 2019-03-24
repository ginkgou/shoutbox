const User = require('./models/user');
User.getByName('Example' , (err, user) => {
console.log(user);
});