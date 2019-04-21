// Example theme.js
import { future } from "mdx-deck/themes";
import okaidia from "react-syntax-highlighter/styles/prism/okaidia";
import jsx from "react-syntax-highlighter/languages/prism/jsx";

export default {
  // extends the default theme
  ...future,
  // custom colors
  colors: {
    ...future.colors, // include existing theme colors
    text: "#00CDBE",
    background: "black",
    link: "#005F5C",
  },
  prism: {
    style: okaidia,
    languages: {
      jsx,
    },
    style: okaidia,
  },
};
