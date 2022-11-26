export function formatName(name) {
  return name.replace(/\.(md)$/, "")
    .replace(/[-]/g, " ");
}

export function formatDate(dateUTC) {
  const date = new Date(dateUTC);

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Monts start at 0
  const dd = date.getDate();

  return dd + "-" + mm + "-" + yyyy;
}
