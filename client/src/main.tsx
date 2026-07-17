import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import {
  applyA11yToDocument,
  loadA11ySettings,
} from "./components/AccessibilityWidget/a11ySettings";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./theme/theme";

applyA11yToDocument(loadA11ySettings());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
