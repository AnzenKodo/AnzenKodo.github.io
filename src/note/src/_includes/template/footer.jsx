export default (props, start_url) => (
  <footer class={props.class}>
    <p>
      <a href={start_url + "license"}>LICENSE</a> <span class="mx-3">|</span>
      {" "}
      <a href="#main">Back to Top</a>
    </p>
  </footer>
);
