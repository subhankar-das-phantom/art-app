# 🎨 Art App - React DataTable with Pagination & Row Selection

This is a React + Vite + TypeScript app that displays artworks from the Art Institute of Chicago API using PrimeReact's DataTable component.

It was built as a submission for the **GrowMeOrganic React Internship Assignment**, based on the video explanation and assignment instructions.

## 🔗 Live Demo

👉 [View deployed app on Netlify](https://assignment-growmeorganicpvt.netlify.app/)

---

## ✅ Features Implemented (As per Assignment Instructions)

- **Vite + TypeScript project setup**
- PrimeReact **DataTable** with **server-side pagination**
- API is called **on every page change** using `page` param (no caching)
- Row **selection persists across page navigation**
- Custom row selection summary panel shows selected count with "Clear All"
- Only selection states are stored to avoid memory issues
- Uses required fields only: `title`, `place_of_origin`, `artist_display`, `inscriptions`, `date_start`, `date_end`

---

## 🧠 Notes from Development Process

- Followed video instructions (`react assignment explanation.mp4` and `checks before submission.mp4`)
- Avoided using Copilot or ChatGPT for logic — wrote all pagination/selection logic manually
- Made sure not to store all fetched data (avoiding memory leak risk)
- Manually handled ID-based selection persistence with simple map structure
- Kept API request logic clean but without over-engineering

---

## 🛠️ Stack

- `React` + `Vite` + `TypeScript`
- `PrimeReact` (for UI)
- `Axios` (for API calls)
- Deployed via `Netlify`

---

## 🚀 Run Locally

```bash
git clone https://github.com/subhankar-das-phantom/art-app.git
cd art-app
npm install
npm run dev

App will be running on: http://localhost:5173

🧪 Checks Before Submission
☑️ No caching of entire datasets
☑️ Server API call on every page change
☑️ Persistent row selection across pagination
☑️ Custom summary panel for selection
☑️ Matches behavior shown in provided video
☑️ No AI code generators used for core logic

📦 Build & Deploy
bash
Copy code
npm run build
Upload the dist/ folder to Netlify or Cloudflare (not Vercel as per instructions).

📡 API Source
Data fetched from:

https://api.artic.edu/api/v1/artworks?page=1

Used fields:

title

place_of_origin

artist_display

inscriptions

date_start

date_end

👤 Contact
GitHub: @subhankar-das-phantom
Email: [subhankarnew1@gmail.com](mailto:subhankarnew1@gmail.com)

Thank you for the opportunity to complete this project!

## Disclaimer

This project was implemented manually without the use of AI-generated code for the core logic.
Note: This logic was written manually based on the React assignment video.  
All pagination, selection, and data-handling logic were written from scratch as per the assignment requirements.
