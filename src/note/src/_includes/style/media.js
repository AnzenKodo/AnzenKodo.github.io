export default `@media (max-width: 1023.9px) {
  .page { display: block }
  .menu { display: inline }
  .menu-items { display: none }
  .menu input {
    @apply appearance-none
    before:(content-☰ text-4xl pl-0.3 leading-none align-right) 
    before:checked:(content-Χ pl-1);
  }
  .menu:has(input:checked) + .menu-items {
    @apply block;
  }
  
  main {
    @apply mt-5
  }
}`;
