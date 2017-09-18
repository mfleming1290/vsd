module.exports = function errorHandler(error){
  let errors = [];

  if (error.errors) {
    errors = Object.keys(error.errors).map(key => error.errors[key].message);
  } else if (typeof error === 'string') {
    errors.push(error);
  } else {
    errors.push(error.message);
  }

  console.log('in errors',errors);

  this.status(422).json(errors);
}

