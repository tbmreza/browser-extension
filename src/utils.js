export function pattern_re(domains) {
  const { name, tld } = domains;
  const pattern_str = `^(?:https?:\/\/)?(?:[^.]+\.)?${name}\.${tld}(\/.*)?$`;
  return new RegExp(pattern_str, "gmi");
}
