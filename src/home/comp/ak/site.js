export default function site(start_url, names) {
  const mapNames = {};
  names.map((name) => mapNames[name] = `${start_url}${name}`);
  return mapNames;
}
