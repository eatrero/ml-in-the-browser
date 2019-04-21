import { future } from "mdx-deck/themes";

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
};
