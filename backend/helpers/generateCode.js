exports.generateCode = length => {
  const code = 100000 + Math.floor(Math.random() * 100000);
  const codeExpire = Math.ceil(+new Date() / 1000) + 300;

  return { code, codeExpire };
};
