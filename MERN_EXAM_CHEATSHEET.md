# 🧠 MERN Lab Exam — Quick Reference Sheet

> Keep this open during the exam. Covers everything you need.

---

## 📁 1. Project Structure to Expect

```
project-root/
├── backend/          ← Node/Express server
│   ├── models/       ← Mongoose schemas
│   ├── routes/       ← API routes
│   ├── controllers/  ← Logic functions
│   ├── server.js     ← Entry point
│   ├── package.json  ← ⭐ Check this first
│   └── .env          ← MongoDB URI goes here
│
└── frontend/         ← React app
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/ (or api/) ← ⭐ API URL is here
    ├── public/
    │   └── index.html
    └── package.json  ← ⭐ Check this first
```

> Folder names may differ (e.g., `client` instead of `frontend`, `server` instead of `backend`) — the logic is the same.

---

## 🔗 2. Where Everything Connects

### MongoDB ↔ Backend

| File | The Line |
|------|----------|
| `backend/.env` | `MONGO_URI=mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/dbname` |
| `backend/server.js` | `mongoose.connect(process.env.MONGO_URI)` |

### Backend ↔ Frontend (LOCAL)

| File | The Line |
|------|----------|
| `frontend/src/services/api.js` (or similar) | `const BASE_URL = "http://localhost:5000/api/items"` |

### Backend ↔ Frontend (AFTER DEPLOYING)

| File | The Line |
|------|----------|
| Same file as above | `const BASE_URL = "https://your-app.onrender.com/api/items"` |

> ⚠️ You only change ONE line in ONE file when connecting deployed frontend to backend.

---

## 🍃 3. MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster (M0)
2. **Database Access** → Add user → username + password (no special chars like `@` or `/`)
3. **Network Access** → Add IP → `0.0.0.0/0` (allow all)
4. **Connect** → Drivers → Copy the URI
5. Replace `<password>` in the URI with your actual password
6. Paste into `backend/.env` as `MONGO_URI=...`

### Sample .env file
```
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/mydb?retryWrites=true&w=majority
PORT=5000
```

---

## ▶️ 4. Running Locally

### Backend
```bash
cd backend
npm install
# Create .env file and add MONGO_URI
npm run dev        # or: npm start
```
Test: open `http://localhost:5000` → should return a JSON message

### Frontend
```bash
cd frontend
npm install
npm start          # opens http://localhost:3000
```

---

## 🔍 5. How to Read package.json for Deploy Settings

Always open `package.json` in the folder you're deploying. Look at `"scripts"`:

### Create React App (CRA)
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```
→ Build output folder: **`build`**

### Vite
```json
"scripts": {
  "dev": "vite",
  "build": "vite build"
}
```
→ Build output folder: **`dist`**

### How to tell which one?
- `react-scripts` in build script = **CRA** → output = `build`
- `vite` in build script = **Vite** → output = `dist`

---

## 🚀 6. Deploy Backend → Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect GitHub → select your repo
3. Fill in the settings:

| Field | How to find it | Typical value |
|-------|---------------|---------------|
| **Root Directory** | Folder containing backend `package.json` | `backend` |
| **Build Command** | Always this | `npm install` |
| **Start Command** | `"start"` script in `package.json` | `npm start` |

4. **Environment Variables** → Add:
   - `MONGO_URI` = your full MongoDB Atlas URI
   - `PORT` = `5000`

5. Deploy → wait → copy the URL (e.g. `https://your-app.onrender.com`)

> ⚠️ Never use the `"dev"` script on deployment. That uses nodemon (for local only).

---

## 🌐 7. Deploy Frontend → Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect GitHub → select your repo
3. Fill in the settings:

| Field | How to find it | CRA value | Vite value |
|-------|---------------|-----------|------------|
| **Base Directory** | Folder containing frontend `package.json` | `frontend` | `frontend` |
| **Build Command** | `"build"` script in `package.json` | `npm run build` | `npm run build` |
| **Publish Directory** | Output folder (base dir + output) | `frontend/build` | `frontend/dist` |

4. Deploy

> ⚠️ If you see a blank page after deploy, the Publish Directory is wrong — double-check `build` vs `dist`.

---

## 🔁 8. After Deploying — Update Frontend API URL

**This step is critical. Without it, your deployed frontend still calls localhost.**

Find the file that has `localhost:5000` (usually in `src/services/` or `src/api/`):

```js
// BEFORE (local)
const BASE_URL = "http://localhost:5000/api/items";

// AFTER (deployed) — replace with your Render URL
const BASE_URL = "https://your-app.onrender.com/api/items";
```

Then:
```bash
git add .
git commit -m "Update API URL for deployment"
git push
```
Netlify will auto-redeploy.

---

## 📦 9. Adding a New Field — Checklist

Every time you add a new field, touch these 4 places:

| # | File | What to do |
|---|------|-----------|
| 1 | `backend/models/Item.js` | Add field to Mongoose schema |
| 2 | `backend/controllers/itemController.js` | Add field in `create` and `update` functions |
| 3 | `frontend/src/components/ItemForm.js` | Add input element + add to state + handleSubmit |
| 4 | `frontend/src/components/ItemCard.js` | Display the field value |

---

## 🐙 10. GitHub — Push Your Code

```bash
# First time
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# After making changes
git add .
git commit -m "describe what you changed"
git push
```

> ⚠️ Make sure `.env` is in `.gitignore` — never push your MongoDB URI to GitHub!

---

## 🐛 11. Common Problems & Fixes

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Backend won't start | `.env` missing or wrong | Check `.env` file exists, MONGO_URI is correct |
| MongoDB connection error | IP not whitelisted | Atlas → Network Access → add `0.0.0.0/0` |
| Frontend shows no data | Wrong API URL | Check `BASE_URL` in services file |
| Deployed frontend can't fetch data | Still pointing to localhost | Update `BASE_URL` to Render URL and redeploy |
| Netlify blank page | Wrong publish directory | Check `build` vs `dist` |
| Render build fails | Wrong root directory | Make sure it points to `backend` folder |
| CORS error in browser | Backend missing CORS | `app.use(cors())` in `server.js` |
| Port already in use (local) | Another process using 5000 | Change `PORT` in `.env` or kill the process |

---

## ✅ Full Deployment Checklist

- [ ] Code works locally with MongoDB Atlas URI
- [ ] `.env` is in `.gitignore`
- [ ] Code pushed to public GitHub repo
- [ ] Backend deployed on Render (check the URL loads)
- [ ] `BASE_URL` in frontend updated to Render URL
- [ ] Updated code pushed to GitHub
- [ ] Frontend deployed on Netlify (check the site loads)
- [ ] Test: add an item on deployed site → check it saves

---

## 🔑 Key URLs

- MongoDB Atlas: https://cloud.mongodb.com
- Render: https://render.com
- Netlify: https://netlify.com
- GitHub: https://github.com

DELETE — copy this exactly
js// DELETE /api/items/:id - Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

PUT — copy this exactly
js// PUT /api/items/:id - Update an item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

The Only 2 Lines You Actually Need to Memorize
Everything else is just copied from your existing GET/POST structure. The only new things are:
js// DELETE — this one line does the work
await Item.findByIdAndDelete(req.params.id);

// PUT — this one line does the work
await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
Notice how your existing POST uses err.status(400) for catch, and GET uses 500 — keep that same pattern. DELETE uses 500, PUT uses 400. That matches what you already have.
