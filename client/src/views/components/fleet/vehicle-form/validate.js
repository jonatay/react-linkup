const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 25) {
    errors.name = 'Must be 25 chars or less';
  }

  if (!values.registration) {
    errors.registration = 'Required';
  } else if (
    values.registration.length < 5 ||
    values.registration.length > 10
  ) {
    errors.registration = 'Must between 5 and 10 characters in length';
  }

  if (!values.make) {
    errors.make = 'Required';
  } else if (values.make.length > 20) {
    errors.make = 'Must be 20 chars or less';
  }

  if (!values.model) {
    errors.model = 'Required';
  } else if (values.model.length > 20) {
    errors.model = 'Must be 20 chars or less';
  }

  if (!values.year) {
    errors.year = 'Required';
  } else if (Number.isNaN(Number(values.year))) {
    errors.year = 'Must be an Integer';
  } else if (
    values.year < 1969 ||
    values.year > new Date().getUTCFullYear() + 1
  ) {
    errors.year = `Must be between 1969 and ${new Date().getUTCFullYear() + 1}`;
  }

  // if (!values.get('name')) {
  //   errors.name = 'Required';
  // } else if (values.get('name').length > 20) {
  //   errors.name = 'Must be 20 characters or less';
  // }
  // if (!values.get('email')) {
  //   errors.email = 'Required';
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
  // ) {
  //   errors.email = 'Invalid email address';
  // }
  // if (!values.get('age')) {
  //   errors.age = 'Required';
  // } else if (isNaN(Number(values.get('age')))) {
  //   errors.age = 'Must be a number';
  // } else if (Number(values.get('age')) < 18) {
  //   errors.age = 'Sorry, you must be at least 18 years old';
  // }
  return errors;
};

export default validate;
