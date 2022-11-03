export const style = `
body>header h1 {
  font-size: 2em;
}
body>header h2 {
  font-size: 1.5em;
}
nav ul li {
  display: inline-table;
}
nav li {
  margin-right: 0em;
}

.topic {
  --nav-border: 2px solid var(--fg);
  display: block;
  margin-top: 2em;
  border: var(--nav-border);
  padding-bottom: 1em;
}

.topic p {
  border-style: double;
  padding-left: 0.3em;
  padding-right: 0.3em;
  font-weight: bold;
  font-size: 1em;
}

.cat {
  margin-top: 1.6em;
  margin-left: 1em;
  border: var(--nav-border);
  position: relative;
}

ul:has(> .status) {
  margin: 0.5em 1em 0.5em 1em;
}
.status, .status:first-child {
  display: block;
}

body>header {
  margin-bottom: 0em;
}

main p {
  margin: 0;
}

.table {
  margin-top: 2em;
  overflow: auto;
  transform:rotateX(180deg);
}
table {
  white-space: nowrap;
  width: 100%;
  margin-top: 3em;
  transform:rotateX(180deg);
  -ms-transform:rotateX(180deg);
}

tr > td:has(img) {
  padding: 0;
  text-align: center;
  padding-top: .5em;
  white-space: nowrap;
  overflow: hidden;
}

table td img {
  max-width: 0.5em;
  position: relative;
  color: var(--bg);
  font-size: 6em;
}

img[alt]:after {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  font-family: 'Helvetica';
  font-weight: 300;
  line-height: 2;
  text-align: center;
  content: attr(alt);
}

tr td:nth-child(2) {
  max-width: 15em;
  min-width: 15em;
  white-space: initial;
}
`;
