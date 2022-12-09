export default `.files summary {
  cursor: pointer;
}
.files li {
  @apply leading-tight mt-2;
}
.files details {
  @apply mt-2;
}
.files details details{
  @apply ml-3;
}
.files details li {
  @apply ml-4;
}
.files .active {
  @apply font-bold;
}
.files .not-active {
  @apply font-normal;
}

.toc ol {
  @apply list-decimal;
  counter-reset: item;
}
.toc li {
  @apply ml-3 list-inside;
}
.toc ol li::before { 
  content: counters(item, ".") " "; 
  counter-increment: item;
}`;
