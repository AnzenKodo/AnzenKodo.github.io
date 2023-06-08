export default await fetch(
  "https://api.notion.com/v1/databases/c2dc30d7174b437188c91ef663bc99d2",
  {
    headers: {
      "Authorization": `Bearer ${Deno.env.get("NOTION_API_KEY")}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
  },
)
  .then((res) => res.json())
  .then((res) => res.description[0].plain_text);
