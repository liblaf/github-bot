import base from "@liblaf/config/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base],
  env: {
    browser: true,
    node: true,
  },
  options: {
    reportUnusedDisableDirectives: "warn",
    typeAware: true,
    typeCheck: true,
  },
});
