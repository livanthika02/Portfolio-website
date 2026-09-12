# 🎨 Full-Stack Personal Portfolio Website

A colorful, animated, full-stack portfolio built with:
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (via Mongoose)

Projects, About Me content, and Contact messages are all served through a
REST API and stored in a real database — not hardcoded in the HTML.

```
portfolio-website/
├── backend/
│   ├── config/db.js         # MongoDB connection
│   ├── models/Project.js    # Project schema
│   ├── models/Contact.js    # Contact message schema
│   ├── routes/projects.js   # GET/POST/PUT/DELETE /api/projects
│   ├── routes/contact.js    # POST/GET /api/contact
│   ├── server.js            # Express app entry point
│   ├── seed.js               # Inserts 4 sample projects into DB
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html            # Home / About / Projects / Skills / Contact
    ├── css/style.css         # Colorful theme, animations, responsive layout
    └── js/script.js          # Fetches projects from API, handles the form
```

## 1. Prerequisites
- [Node.js](https://nodejs.org) installed (v18+ recommended)
- A MongoDB database — either:
  - Install MongoDB locally, **or**
  - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) (easiest)

## 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and paste your MongoDB connection string into `MONGO_URI`.

Seed the database with 4 sample projects (edit `seed.js` first to put in
YOUR real projects):
```bash
npm run seed
```

Start the server:
```bash
npm start
```
Visit **http://localhost:5000** — Express serves the frontend AND the API
from the same server, so everything works together immediately.

## 3. Editing Your Content
- **About Me text:** edit the `<section id="about">` block in `frontend/index.html`.
- **Projects:** don't edit the HTML — edit `backend/seed.js` (or POST to
  `/api/projects`) and re-run `npm run seed`. The frontend pulls projects
  live from the database.
- **Skills:** edit the `.skill-pill` list in `frontend/index.html`.
- **Colors:** change the CSS variables at the top of `frontend/css/style.css`.

## 4. API Endpoints
| Method | Endpoint            | Description             |
|--------|---------------------|--------------------------|
| GET    | /api/projects        | Get all projects         |
| GET    | /api/projects/:id    | Get one project          |
| POST   | /api/projects        | Add a new project        |
| PUT    | /api/projects/:id    | Update a project         |
| DELETE | /api/projects/:id    | Delete a project         |
| POST   | /api/contact         | Submit contact form      |
| GET    | /api/contact         | View all messages (admin)|

## 5. Deployment

### Option A — Deploy everything together (simplest)
Since Express serves the frontend, you can deploy the whole `backend/`
folder (which includes `frontend/`) to **Render**, **Railway**, or **Heroku**:
1. Push this project to a GitHub repo.
2. Create a new Web Service on Render/Railway, point it at the repo,
   set the root directory to `backend`.
3. Add environment variable `MONGO_URI` (use MongoDB Atlas for a cloud DB).
4. Set the start command to `npm start`.

### Option B — Split deployment
- **Frontend** → deploy the `frontend/` folder to **Netlify** or **Vercel**.
- **Backend** → deploy the `backend/` folder to **Render**, **Railway**, or **Heroku**.
- In `frontend/js/script.js`, change:
  ```js
  const API_BASE = "/api";
  ```
  to your deployed backend URL, e.g.:
  ```js
  const API_BASE = "https://your-backend.onrender.com/api";
  ```
- Also enable CORS for your frontend's domain in `backend/server.js` if needed.

## 6. Notes
- The frontend also works standalone (with sample data) if you open
  `index.html` directly without running the backend — useful for a quick
  visual preview — but the contact form and live project data need the
  backend + database running.
- Free hosting note: Heroku no longer offers a free tier; **Render** or
  **Railway** are good free alternatives for the backend today.
