await fetch("https://metrics.lecoq.io/insights/AnzenKodo");

export const languages = await fetch(
  "https://metrics.lecoq.io/insights/query/AnzenKodo/languages",
)
  .then((res) => res.json())
  .then((res) => Object.keys(res.stats));
