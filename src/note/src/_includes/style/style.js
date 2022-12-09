export default (theme, theme_dark) =>
  `:root {
  --theme: ${theme};
  @apply accent-$theme;
  color-scheme: dark light;
}
::selection {
  @apply bg-blue-500 text-white;
}
body { font-family: 'Radio Canada', sans-serif; }

a {
  @apply text-$theme;
}
a:hover, a:focus {
  @apply underline;
}
a:active {
  @apply bg-$theme text-inherit;
}

.footnotes {
  @apply mt-3;
}
.footnotes li p {
  @apply mb-0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --theme: ${theme_dark};
  }
}`;
