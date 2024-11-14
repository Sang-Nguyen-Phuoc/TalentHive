// icon:chevron-left | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";

function IconChevronLeft({size = 30,...props}) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      height={size}
      width={size}
      border-style='solid'
      {...props}
    >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );
}

export default IconChevronLeft;
