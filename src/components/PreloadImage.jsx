import { createPortal } from "react-dom";

export default function PreloadImage({ href }) {
  return createPortal(
    <link rel="preload" as="image" href={href} />,
    document.head
  );
}
