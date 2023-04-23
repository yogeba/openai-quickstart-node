import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "ABeeZee, sans-serif",
    body: "ABeeZee, sans-serif",
  },
  colors: {
    brand: {
      primary: "#d177fa",
      secondary: "#b37d00",
      accent: "#7f00b4",
    },
  },
});

export default theme;
