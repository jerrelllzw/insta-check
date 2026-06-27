# InstaCheck

Find out who isn't following you back on Instagram — right in your browser. Upload your data export, get instant results. No login, and nothing ever leaves your device.

🔗 Live site: [jerrelllzw.github.io/insta-check](https://jerrelllzw.github.io/insta-check/)

## Tech

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## How it works

1. Request your data from Instagram: **Settings → Accounts Center → Your information and permissions → Export your information**. Create an export for your profile, choose **Export to device**, and set the date range to **All time** and the format to **JSON**.
2. Once Instagram emails you that the export is ready, download and unzip it, then grab the followers and following files. Followers may be split across several files (`followers_1.json`, `followers_2.json`, …); grab them all along with `following.json`.
3. Drop the files in here. InstaCheck merges the paginated followers files and compares them against your following list — who follows you back, and who doesn't. The whole comparison runs in your browser, so no server, no login, and nothing leaves your device.

## Running locally

You'll need [Node.js](https://nodejs.org/) (which includes npm).

```bash
# Clone the repo
git clone https://github.com/jerrelllzw/insta-check.git
cd insta-check

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the printed local URL (default: http://localhost:5173).

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```
