const decode = (value, editing) => {
  if (editing) {
    return value;
  }
  return ***REMOVED***(value.replace(/%(?![0-9a-fA-F][0-9a-fA-F]+)/g, "%25"));
};
const parse = (value, editing) => {
  try {
    return JSON.parse(decode(value, editing));
  } catch (error) {
    console.error("error parsing value:" + value);
  }
  return null;
};
const ***REMOVED*** = (p1, p2) => {
  return JSON.stringify(p1) === JSON.stringify(p2);
};
export {
  ***REMOVED*** as c,
  decode as d,
  parse as p
};
