
# CRM Autopilot Dashboard (Next.js Version)

This is a Next.js application that provides a CRM Autopilot Dashboard frontend and a backend API for data synchronization.

## Project Structure

-   **`src/pages/`**: Contains the main pages of the application.
    -   `src/pages/index.tsx`: The main dashboard page.
    -   `src/pages/_app.tsx`: Custom App component for global styles and layout.
    -   `src/pages/api/sync.js`: The backend API endpoint for data synchronization.
-   **`src/components/`**: Reusable React components for the UI.
-   **`src/services/`**: Client-side services, like `geminiService.ts` for interacting with the Gemini API.
-   **`src/constants/`**: Application-wide constants.
-   **`src/types/`**: TypeScript type definitions.
-   **`src/styles/`**: Global styles (`globals.css`).
-   **`public/`**: Static assets (e.g., images, favicon).
-   **`package.json`**: Project dependencies and scripts.
-   **`next.config.js`**: Next.js configuration.
-   **`tailwind.config.js`**: Tailwind CSS configuration.
-   **`postcss.config.js`**: PostCSS configuration.
-   **`Dockerfile`**: For building a Docker image for deployment (e.g., to Google Cloud Run).

## Environment Variables

This application requires several environment variables to be set. Create a `.env.local` file in the root of your project and add the following:

### For Frontend (Client-Side Summarizer)
-   `NEXT_PUBLIC_GEMINI_API_KEY`: Your API key for client-side Gemini API calls (e.g., for the transcript summarizer).

### For Backend (`src/pages/api/sync.js`)
-   `GEMINI_API_KEY`: API key for backend Gemini API calls.
-   `OPENAI_API_KEY`: (Optional) API key for OpenAI if you choose to use it.
-   `GOOGLE_SHEET_ID`: The ID of your Google Sheet.
-   `GOOGLE_SERVICE_EMAIL`: Google Service Account email.
-   `GOOGLE_PRIVATE_KEY`: Google Service Account private key (ensure it's formatted correctly, e.g., replace literal `\n` with actual newlines).
-   `GOOGLE_CALENDAR_ID`: The ID of the Google Calendar to fetch events from (e.g., `your.email@example.com` or `primary`).
-   `INTERNAL_DOMAIN`: Your internal company domain (e.g., `viehq.com`) to help filter calendar events.
-   `FIREFLIES_API_KEY`: API key for Fireflies.ai.
-   `CRON_SECRET`: A secret string to protect the `/api/sync` endpoint when called by a scheduler.
-   `GOOGLE_CLIENT_ID`: (Optional, for OAuth Gmail) Google OAuth Client ID.
-   `GOOGLE_CLIENT_SECRET`: (Optional, for OAuth Gmail) Google OAuth Client Secret.
-   `NEXTAUTH_URL`: (Optional, for OAuth Gmail) The base URL of your application, e.g., `http://localhost:3000`.

**Note on `GOOGLE_PRIVATE_KEY`**: When setting this in `.env.local` or Cloud Run environment variables, ensure the newlines (`\n`) are preserved correctly. It should look like:
\`\`\`
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...
...\n-----END PRIVATE KEY-----\n"
\`\`\`

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env.local` file as described above.

3.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for Production:**
    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```

5.  **Run Production Server:**
    ```bash
    npm run start
    # or
    yarn start
    # or
    pnpm start
    ```

## Deployment (Google Cloud Run)

1.  Ensure you have the Google Cloud SDK installed and configured.
2.  Build the Docker image:
    ```bash
    docker build -t gcr.io/YOUR_GCP_PROJECT_ID/crm-autopilot:latest .
    ```
3.  Push the image to Google Container Registry:
    ```bash
    docker push gcr.io/YOUR_GCP_PROJECT_ID/crm-autopilot:latest
    ```
4.  Deploy to Cloud Run:
    ```bash
    gcloud run deploy crm-autopilot \
        --image gcr.io/YOUR_GCP_PROJECT_ID/crm-autopilot:latest \
        --platform managed \
        --region YOUR_REGION \
        --allow-unauthenticated \
        --set-env-vars "GEMINI_API_KEY=your_key,GOOGLE_SHEET_ID=your_id,..." # Set all required backend env vars
    ```
    (Replace `YOUR_GCP_PROJECT_ID` and `YOUR_REGION` and set all necessary environment variables).

5.  **Set up Cloud Scheduler:**
    Create a Cloud Scheduler job to POST to your deployed `/api/sync` endpoint, including the `X-Cron-Secret` header.

Remember to secure your `/api/sync` endpoint. The current setup uses `allow-unauthenticated` for Cloud Run and relies on the `CRON_SECRET`. For higher security, consider IAM authentication for Cloud Scheduler to invoke Cloud Run.
