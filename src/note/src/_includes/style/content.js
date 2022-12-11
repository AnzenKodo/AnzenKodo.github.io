export default `.content p, .content pre, .content ul, .content ol, .content blockqoute,
.content dl, .content table {
  @apply mb-4;
}

.content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
  @apply font-bold mt-10 mb-2 hover:after:(content-# ml-1 text-$theme);

  a {
    @apply text-inherit no-underline;
  }
}  

.content {
  @apply tracking-wider leading-relaxed;
  word-spacing: .3em;
}
.content h1 {
  @apply text-3xl;
}
.content h2 {
  @apply text-2xl;
}
.content h3 {
  @apply text-xl;
}
.content h4 {
  @apply text-lg;
}
.content h5 {
  @apply text-base;
}
.content h6 {
  @apply text-sm;
}
.content ul li, ol li {
  @apply ml-5 mb-1;
}
.content ul li {
  @apply list-disc;
}
.content ul li ul li {
  @apply list-circle;
}
.content ul li ul li ul li {
  @apply list-square list-outside;
}
.content ol li {
  @apply list-decimal;
}
.content blockquote {
  @apply mx-10 mt-3 mb-1 border-l-5 pt-4 pb-1 px-4;
}
.content img {
  @apply inline border-none;
}
.content figcaption {
  @apply text-center mt-2 italic;
}
.content input[type="checkbox"][disabled]{
  @apply cursor-default;  
}
.content input ~ label {
  @apply ml-3;  
}
.content .task-list-item {
  @apply list-none;
}
.content table {
  @apply overflow-auto block;
}
.content th, .content td {
  @apply border-1 px-3;
}
.content table caption {
  @apply italic;
}
.content pre {
  overflow-x: auto;
  word-spacing: 0;
  line-height: 0;
  padding: 1rem;
  background: #1a1b26;
}
.content .katex { 
  display: inline-flex;
  max-width: 100%;
  overflow: auto;
  padding-bottom: .5em;
}`;
