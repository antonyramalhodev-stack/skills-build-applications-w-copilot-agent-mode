# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Octofit Tracker Frontend
  {
  The React 19 presentation tier uses Vite, React Router, and Bootstrap. Start it with `npm run dev` from this package or `npm --prefix octofit-tracker/frontend run dev` from the repository root.
    extends: [
  For API requests in GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined. Add it to `octofit-tracker/frontend/.env.local` before starting Vite:

  ```env
  VITE_CODESPACE_NAME=your-codespace-name
  ```
      // Alternatively, use this for stricter rules
  Vite exposes this value through `import.meta.env`. The frontend then requests the API at `https://<codespace-name>-8000.app.github.dev`. When the variable is unset, requests use `http://localhost:8000`.
      // Optionally, add this for stylistic rules

