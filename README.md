# InstaCheck

Find out who isn't following you back on Instagram — right in your browser. Upload your data export, get instant results. No login, and nothing ever leaves your device.

🔗 Live site: [insta-unfollow.vercel.app](https://insta-unfollow.vercel.app/)

## Tech

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## How it works

1. Request your data from Instagram: **Settings → Accounts Center → Your information and permissions → Download your information**. Select **Followers and following**, choose **JSON** format, and **All time** range.
2. Once Instagram emails you the export, unzip it and grab `followers_1.json` and `following.json`.
3. Upload both files here. The comparison runs entirely in your browser — no server, no tracking.

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
