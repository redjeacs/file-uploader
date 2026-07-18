# 📂 File Cloud Uploader 

A professional, full-stack cloud storage application featuring secure user authentication, folder hierarchy structures, dynamic file organization, and media cloud uploads. Built to mimic core functionalities of cloud platforms like Google Drive or Dropbox.

## 🌐 Live Demo
👉 **[View the Live Application](https://file-uploader-production-e41b.up.railway.app/)**

<p>
   <a href="https://file-uploader-production-e41b.up.railway.app/">
     <img width="1920" height="1080" alt="Screenshot 2026-07-18 162929" src="https://github.com/user-attachments/assets/c1617166-c9a3-4c1d-aeb1-c2b05f4093df" />
     <img width="1920" height="1080" alt="Screenshot 2026-07-18 162901" src="https://github.com/user-attachments/assets/e6210d5b-1177-4aae-a570-0f4dcf5c8190" />
   </a>
</p>

---

## ✨ Features

- **🔐 Robust Authentication:** Secure signup, login, and persistency layers powered by `Passport.js` (Local Strategy) and `bcryptjs` for strict password hashing encryption.
- **📁 Nested Folder Management:** Create, rename, view, and delete deep folder trees with strict ownership constraints.
- **📤 Cloud Media Storage:** Seamless dynamic file streaming, storage parsing via `multer`, and deployment hosting integrated directly via the **Cloudinary SDK**.
- **📋 Meta Tracking:** Granular user visibility tracking, showing file sizes, creation timestamps, and download routes inside server-side compiled layouts.

---

## 🛠️ Tech Stack

### Backend & Core Logic
- **Runtime Environment:** Node.js (v22+)
- **Server Framework:** Express.js (v5.1 REST Router architecture)
- **Database Engine & Hosting:** PostgreSQL managed via **Supabase**
- **Object-Relational Mapping (ORM):** Prisma ORM v7 (with native Driver Adapters)
- **Authentication:** Passport.js & Express-Session
- **Cloud Storage:** Cloudinary parsed through multer

### Frontend UI Layouts
- **Template Rendering Engine:** EJS (Embedded JavaScript) for fast, dynamic server-side template assembly
- **Styles & Layout:** Pure CSS3 (Responsive grid frameworks)

---

## 💻 Local Installation & Setup

Follow these steps to run this application locally on your computer:

### 1. Clone the Repository
```bash
git clone https://github.comd/redjeacs/file-uploader
cd file-uploader
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Setup Your Environment Variables
Create a file named `.env` in the root directory of your project and configure your local or cloud keys:
```env
NODE_ENV="development"
DEMO_PASSWORD="demopassword"

# Database Connections
LOCAL_DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@localhost:5432/[YOUR_LOCAL_DB]"
## DATABASE_URL="your_production_url"

# Cloudinary Storage Accounts
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"

# Server Port
PORT=8080
```

### 4. Push the Prisma Schema to Your Database
Use the explicit environment loader to build out your four operational database model tables (`User`, `Folder`, `File`, `Session`):
```bash
npx dotenv -e .env -- npx prisma db push
```

### 5. Launch the Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:8080`.

---
