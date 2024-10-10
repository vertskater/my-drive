# Express File Management System with Prisma and Passport.js

## Project Overview
This project is a file management system built using Express.js, Prisma, and Passport.js. It allows users to authenticate using session-based authentication, upload files to specific folders, and view file details. The files are stored in a cloud storage service (e.g., Supabase or Cloudinary), and all session data is persisted in a database using Prisma session store.

## Features
- **Session-based Authentication**: User authentication using Passport.js, with sessions stored in the database.
- **File Uploads**: Authenticated users can upload files into folders.
- **Folder Management**: Users can create, update, delete, and list folders.
- **File Details**: View specific file details (name, size, upload time) and download files.
- **Cloud Storage Integration**: Files are uploaded to a cloud storage provider, with file URLs stored in the database.

## Prerequisites
Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) or another relational database
- [Prisma](https://www.prisma.io/)
- Cloud storage account (Supabase or Cloudinary recommended)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/your-project.git
cd your-project
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
SESSION_SECRET="your_secret_key"
SUPABASE_URL="https://your-supabase-url"
SUPABASE_KEY="your-supabase-key"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name" # If using Cloudinary
```
### 4. Prisma Setup
Initialize Prisma and migrate the database:
```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```
### 5. Run the Project
Start the Server
```bash
npm run start
```
## Project Structure
```bash
.
├── prisma               # Prisma schema and migrations
├── routes               # Express routes
├── controllers          # Route handlers
├── db                   # Database operations with Prisma
├── views                # EJS templates for rendering frontend
├── public               # Static assets
└── app.js               # Main application entry point
```
## Key Functionalities
### 1. Authentication (Passport.js)
- Session-based authentication using ```express-session``` and ```passport.js```.
- Sessions are persisted in the database using ```Prisma session store```.

### 2. File Uploads
- Users can upload files within specific folders.
- File upload is handled by ```multer``` middleware.
- Initially, files are saved in ```multer.memoryStorage()```. Later, files are uploaded to cloud storage (Supabase or Cloudinary) with their URLs saved in the database.

### 3. Folder Management

- CRUD operations on folders, allowing users to organize files in specific folders.

## Cloud Storage Integration
To upload files to a cloud storage provider (e.g., Supabase, Cloudinary):

- Sign up and configure your cloud storage provider.
- Set the respective API keys in the .env file.
- Files uploaded will be stored in the cloud, and their URLs will be saved in the database.

## Licence
This project is licensed under the MIT License.