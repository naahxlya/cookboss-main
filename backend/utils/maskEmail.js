function maskEmail(email) {

  const [name, domain] =
    email.split("@");

  const maskedName =
    name.slice(0, 3) +
    "*".repeat(name.length - 3);

  const [domainName, extension] =
    domain.split(".");

  const maskedDomain =
    domainName.slice(0, 1) +
    "*".repeat(domainName.length - 1);

  return `${maskedName}@${maskedDomain}.${extension}`;
}

module.exports = maskEmail;