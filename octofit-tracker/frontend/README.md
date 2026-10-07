# OctoFit Tracker frontend

The React 19 presentation tier is served by Vite on port `5173`. The API runs
on port `8000`.

## Configure the API URL

Vite reads `VITE_CODESPACE_NAME` from the frontend environment. In a Codespace,
create `octofit-tracker/frontend/.env.local` with your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then sends requests to
`https://your-codespace-name-8000.app.github.dev`. Forward port `8000` in VS
Code and make sure the backend is running. Restart Vite after changing the
environment file.

When `VITE_CODESPACE_NAME` is not set, API requests use
`http://localhost:8000`, suitable when the browser can reach the local API.
