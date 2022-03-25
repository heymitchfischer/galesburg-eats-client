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

export function formatDateTime(dateString) {
  let date = new Date(dateString);
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

  return date.toLocaleDateString("en-US", options);
}

export function getCookieAuth() {
  let name = '_site_data=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length)).auth;
    }
  }

  return '';
}

export function clearCookieAuth() {
  document.cookie = '_site_data=; Path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function setCookieAuth(auth) {
  document.cookie = `_site_data=${JSON.stringify({ auth: auth })}; max-age=${60*60*24*365} path=/; SameSite=strict; Secure;`;
}
