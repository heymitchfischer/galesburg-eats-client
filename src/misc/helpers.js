export function convertToDollars(price) {
  return `$${(price/100).toFixed(2)}`;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeUnderscores(string) {
  return string.replace("_", " ");
}

export function formatErrors(errorsArray) {
  let errors = [];

  for (const [key, value] of Object.entries(errorsArray)) {
    let error = `${removeUnderscores(key)} ${value}`;
    errors.push(capitalize(error));
  }

  return errors;
}
