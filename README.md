# 📦 MERN Item Manager — Lab Test Practice

A full-stack MERN application with separate frontend and backend.
Your job: complete the TODOs, add a new field, and deploy everything.

---

## 📁 Project Structure

```
mern-item-manager/
├── backend/
│   ├── controllers/itemController.js   ← TODO: add your field in create/update
│   ├── models/Item.js                  ← TODO: add your new field to schema
│   ├── routes/itemRoutes.js
│   ├── server.js
│   ├── .env.example                    ← Copy to .env and add your MongoDB URI
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ItemForm.js             ← TODO: add input for your new field
    │   │   └── ItemCard.js             ← TODO: display your new field
    │   ├── services/
    │   │   └── itemService.js          ← TODO (later): update URL after deployment
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## ✅ YOUR TODO CHECKLIST

### Step 1 — Set up MongoDB
- [ ] Log into [MongoDB Atlas](https://www.mongodb.com/atlas)
- [ ] Create a free cluster (M0)
- [ ] Add a database user (username + password — no special chars in password!)
- [ ] Allow network access: IP Address → `0.0.0.0/0`
- [ ] Get connection string: Connect → Drivers → copy the URI
- [ ] In `backend/`, copy `.env.example` → `.env` and paste your URI

### Step 2 — Run Backend Locally
```bash
cd backend
npm install
npm run dev       # runs on http://localhost:5000
```
Test: open http://localhost:5000 — should show `{"message":"Item Manager API is running!"}`

### Step 3 — Run Frontend Locally
```bash
cd frontend
npm install
npm start         # runs on http://localhost:3000
```

### Step 4 — ADD YOUR NEW FIELD (The main task!)

Pick **at least one** new field to add. Suggestions:
| Field | Type | Example values |
|-------|------|----------------|
| `category` | String (enum) | Electronics, Food, Books... |
| `quantity` | Number | 0, 10, 50... |
| `imageUrl` | String | URL to an image |
| `rating` | Number (0-5) | 3.5 |
| `supplier` | String | Supplier name |
| `discount` | Number | 10 (for 10%) |

**Files to edit — search for `// TODO` comments in each:**

1. **`backend/models/Item.js`** — Add field to Mongoose schema
2. **`backend/controllers/itemController.js`** — Add field to create + update
3. **`frontend/src/components/ItemForm.js`** — Add input element + state
4. **`frontend/src/components/ItemCard.js`** — Display the field on the card

### Step 5 — Push to GitHub
```bash
# In the mern-item-manager/ root folder:
git init
git add .
git commit -m "Initial commit - MERN Item Manager"

# Create a NEW public repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```
⚠️ Make sure `.env` is NOT committed (it's in .gitignore)

### Step 6 — Deploy Backend (Render / Railway)

**Using Render (recommended free option):**
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Set root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `PORT` = 5000
7. Deploy → copy your Render URL (e.g. `https://your-app.onrender.com`)

### Step 7 — Update Frontend API URL
In `frontend/src/services/itemService.js`:
```js
// Change this:
const BASE_URL = "http://localhost:5000/api/items";

// To this:
const BASE_URL = "https://your-app.onrender.com/api/items";
```
Commit and push this change.

### Step 8 — Deploy Frontend (Netlify / Vercel)

**Using Netlify:**
1. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
2. Connect your GitHub repo
3. Set base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `frontend/build`
6. Deploy!

**Using Vercel:**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set root directory: `frontend`
4. Deploy!

---

## 🔍 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/items | Get all items |
| GET | /api/items/:id | Get one item |
| POST | /api/items | Create item |
| PUT | /api/items/:id | Update item |
| DELETE | /api/items/:id | Delete item |

### Sample Request Body (POST/PUT)
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic 2.4GHz wireless mouse",
  "price": 2500,
  "inStock": true
}
```

---

## 🐛 Common Issues

**Backend won't connect to MongoDB:**
- Check your `.env` file exists (not `.env.example`)
- Make sure your IP is whitelisted in Atlas (use `0.0.0.0/0`)
- No special characters in your DB password

**Frontend can't reach backend:**
- Confirm backend is running on port 5000
- After deployment, make sure you updated the BASE_URL in itemService.js

**Build fails on Netlify/Vercel:**
- Check that your base directory is set to `frontend`
- Make sure all npm packages are in `dependencies` not `devDependencies`


🏗️ Phase 1: The Backend (Node/Express)
Initialize: mkdir backend && cd backend && npm init -y

Install: npm install express mongoose cors dotenv

Environment: Create .env → add MONGO_URI and PORT=5000.

Ignore: Create .gitignore → add node_modules and .env.

Run: node server.js (or npx nodemon server.js if installed).

🎨 Phase 2: The Frontend (React)
Initialize: (In root folder) npx create-react-app frontend

Navigate & Install: cd frontend && npm install axios

Run: npm start (Runs on localhost:3000).

Build (for deployment): npm run build.

📤 Phase 3: Git & GitHub
Initialize Git: (In root folder) git init

Create Root .gitignore:

Plaintext
node_modules
.env
build
Connect to GitHub:

git add .

git commit -m "Complete MERN Project"

git branch -M main

git remote add origin <YOUR_RE_URL>

git push -u origin main

🚀 Phase 4: Deployment
Backend (Render)
New Web Service → Connect GitHub Repo.

Root Directory: backend.

Build Command: npm install.

Start Command: node server.js.

Env Vars: Add MONGO_URI (from Atlas) and PORT (5000).

Copy Live URL: (e.g., https://api.onrender.com).

Bridge Update (React)
Update App.js: Change localhost:5000 to your Render URL.

Push: git add . -> git commit -> git push.

Frontend (Netlify)
New Site from Git → Connect Repo.

Base Directory: frontend.

Build Command: npm run build.

Publish Directory: build.
