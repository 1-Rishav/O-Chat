<a id="readme-top"></a>

# O‑Chat

A friendly language‑exchange and messaging app with real‑time chat, 1‑click video calls, friend requests, and smart recommendations. The app uses Stream for chat and video, a Node.js/Express API with MongoDB, and a modern React + Tailwind CSS UI (with DaisyUI components).

> Quick glance
> - Frontend: React 19, Vite, Tailwind CSS, DaisyUI, React Router, React Query, Zustand, Stream Chat/Video SDKs
> - Backend: Node.js, Express, MongoDB (Mongoose), JWT cookie auth, Stream server SDK
> - Dev ports: API on 5001, Vite on 5173

---

## Screenshots

| Home | Chat | Notifications |
|---|---|---|
| ![Home](/Images/Home.jpg) | ![Chat](/Images/ChatPage.jpg) | ![Notifications](/Images/Notification.jpg) |

---

## Features

- Email/password authentication with secure HTTP‑only cookies
- Guided onboarding (profile, languages, location, avatar)
- Friend system: recommendations, send/accept requests, list friends
- Real‑time 1:1 chat powered by Stream Chat
- One‑click video calls via Stream Video with sharable invite links
- Clean, responsive UI built with Tailwind CSS + DaisyUI and a theme selector

---

## Tech Stack

- React 19 + Vite
- Tailwind CSS + DaisyUI
- Stream Chat (stream-chat, stream-chat-react)
- Stream Video (@stream-io/video-react-sdk)
- React Router, React Query, Zustand, Axios, React Hot Toast
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) + cookie-based auth

---

## Monorepo structure

```
O-Chat/
├─ backend/                 # Express API
│  ├─ src/
│  │  ├─ controllers/      # auth, user, chat
│  │  ├─ lib/              # db and Stream server helpers
│  │  ├─ middleware/       # auth middleware
│  │  ├─ models/           # User, FriendRequest
│  │  └─ server.js         # app entry
│  └─ package.json
├─ frontend/                # React app (Vite)
│  ├─ src/
│  └─ package.json
├─ package.json             # root scripts (build/start)
└─ Images/                  # screenshots
```

---

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string
- Stream account with API Key and Secret (https://getstream.io)

---

## Environment variables

Create two .env files—one for the backend and one for the frontend.

Backend (`backend/.env`):

```env
# App
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=your uri

# Auth
JWT_SECRET_KEY=replace-with-a-long-random-string

# Stream 
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
```

Frontend (`frontend/.env`):

```env
VITE_STREAM_API_KEY=your-stream-api-key
```


- CORS is configured for http://localhost:5173; if you change the Vite port, also update it in `backend/src/server.js`.

---

## Run locally (development)

Install dependencies and start both apps in separate terminals.

1) Backend

```powershell
cd backend
npm install
# ensure backend/.env is created as shown above
npm run dev
```

2) Frontend

```powershell
cd frontend
npm install
# ensure frontend/.env is created with VITE_STREAM_API_KEY
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:5001

Login/signup in the UI, complete onboarding, add friends, chat, and start a video call. When you click the camera button in a chat, O‑Chat posts an invite link to the channel (e.g., `/call/<id>`).

Alternative (from the repo root):

```powershell
# start backend only
npm run start --prefix backend

# dev servers (run each in its own terminal)
npm run dev --prefix backend
npm run dev --prefix frontend
```

---

## Build for production

The root build script installs deps and builds the frontend. Then you can run the Express server which serves the built React app when `NODE_ENV=production`.

```powershell
# from repo root
npm run build

# PowerShell: set env for the current session
$env:NODE_ENV = "production"
npm run start
```

The server listens on `PORT` (default 5001) and serves the frontend from `frontend/dist`.

---

## Available scripts

Backend (`backend/package.json`)
- `npm run dev` – start API with nodemon at http://localhost:5001
- `npm start` – start API with node

Frontend (`frontend/package.json`)
- `npm run dev` – Vite dev server (default http://localhost:5173)
- `npm run build` – production build
- `npm run preview` – preview the production build

Root (`package.json`)
- `npm run build` – install deps and build the frontend
- `npm start` – start backend (serves the built frontend in production)

---

## API overview

Base URL in development: `http://localhost:5001/api`

Auth
- `POST /auth/signup` – body: `{ email, password, fullName }`
- `POST /auth/login` – sets `jwt` HTTP‑only cookie
- `POST /auth/logout` – clears cookie
- `POST /auth/onboarding` – protected; body: `{ fullName, bio, nativeLanguage, learningLanguage, location }`
- `GET /auth/me` – protected; returns the authenticated user

Users
- `GET /users` – recommended users (excludes you and your current friends)
- `GET /users/friends` – your friends list
- `POST /users/friend-request/:id` – send request
- `PUT /users/friend-request/:id/accept` – accept request
- `GET /users/friend-requests` – incoming (pending) + accepted
- `GET /users/outgoing-friend-requests` – pending requests you sent

Chat/Video
- `GET /chat/token` – protected; returns a Stream user token used by the frontend

Cookies & auth: the API uses an HTTP‑only `jwt` cookie. Ensure requests include credentials; the frontend Axios instance is configured with `withCredentials: true`.

---

## Troubleshooting

- MongoDB connection: verify `MONGO_URI` and IP access in your MongoDB project.
- Stream credentials: the API key/secret must match the frontend `VITE_STREAM_API_KEY` and the backend must use the Secret to mint tokens.
- CORS or cookies: keep frontend on 5173 and API on 5001 (or update CORS origin). Cookies won’t flow if origins don’t match your config.
- 401 Unauthorized: make sure you logged in and the browser is sending cookies.
- Video/Chat not connecting: confirm the Stream user is upserted (backend logs) and that the token endpoint is reachable.

---

## Contributing

Pull requests are welcome. For larger changes, please open an issue first to discuss what you’d like to change.

---

## License

No license has been declared for this repository yet. Add a LICENSE file (e.g., MIT) if you plan to distribute or accept external contributions.

---

## Contact

Feel free to open an issue on this repository with questions, ideas, or bug reports.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
