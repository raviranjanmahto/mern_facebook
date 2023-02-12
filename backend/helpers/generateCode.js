exports.generateCode = length => {
  const code = Math.ceil(Math.random() * 1000000) + 1;
  const codeExpire = Math.ceil(+new Date() / 1000) + 300;

  return { code, codeExpire };
};
