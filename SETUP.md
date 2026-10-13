\# My Portfolio Project — Setup Guide



\## Project Information



\- Frontend: Vue 3 + TypeScript + Vite

\- Backend: Node.js + Express + TypeScript

\- Database: Supabase PostgreSQL

\- Frontend hosting: Vercel

\- Backend hosting: Render

\- Repository: https://github.com/SEEKxLuffy/portfolio



\## 1. Install Requirements



Install Node.js, npm, Git, and VS Code on the new computer.



PostgreSQL does not need to be installed locally when using the hosted Supabase database.



\## 2. Clone the Project



```powershell

git clone https://github.com/SEEKxLuffy/portfolio.git

cd portfolio

```



\## 3. Configure and Start the Backend



```powershell

cd backend

npm install

Copy-Item ".env.example" ".env"

```



Open `backend/.env` and enter the database connection details from my password manager.



Start the backend:



```powershell

npm start

```



The local backend normally runs on port 3000.



\## 4. Start the Frontend



Open a second terminal:



```powershell

cd D:\\portfolio

npm install

npm run dev

```



Open the local URL displayed by Vite, usually http://localhost:5173.



\## 5. Online Services



\- GitHub: https://github.com/SEEKxLuffy/portfolio

\- Vercel: https://vercel.com/dashboard

\- Render: https://dashboard.render.com

\- Supabase: https://supabase.com/dashboard



\## 6. Credentials



Retrieve the following from my password manager:



\- Supabase database connection details

\- Admin login email and password

\- Any required API keys



Never store real passwords in this document or commit `.env` files to GitHub.



\## 7. Vercel Routing



The project root contains `vercel.json` to support direct navigation to Vue frontend routes.



\## 8. Troubleshooting



If the backend cannot connect to the database, check that `backend/.env` contains the correct DATABASE\_URL.



If Vite is not recognized, run `npm install` in the frontend project folder.



If the backend cannot find its start script, inspect the backend package.json. The current start command is `npm start`.

