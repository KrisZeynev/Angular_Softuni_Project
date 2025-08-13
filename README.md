# Angular_Softuni_Project
SoftUni - Angular project 2025

## 📥 Installation

### 1️⃣ Clone or Download the Project
Download the project files or clone the repository to your local machine.

### 2️⃣ Set up the Server

Open a new terminal window and navigate to the server folder:

```bash
cd softuni-practice-server
```

At first, you need to install npm modules:

```bash
npm install
```

Start the server:
```bash
npm start
```

### 3️⃣ Set up the Client

Open another terminal window and navigate to the client folder:

```bash
cd books-project
```

Run the Angular development server:
```bash
ng serve
```

### 4️⃣ Open the App

Open your browser and go to:

http://localhost:4200/

## 🔍 Overview

This is my Angular app that allows authenticated users to create new books. If the currently authenticated user is the owner of a book, they have the ability to edit or delete the book. Every authenticated user can add comments, and only the owner of a comment can edit or delete it.

Non-authenticated users can only view the already added books and see their details, but they cannot interact with them.

## 📂 Project Structure

```plaintext
src/
 ├── app/
 │   ├── components/      # Reusable UI elements such as headers, footers, and book cards
 │   ├── guards/          # AuthGuard for route protection
 │   ├── services/        # Angular services for handling users, books, and comments
 │   ├── pages/           # Main pages (Home, Catalog, Book Details, Favorites)
 │   ├── models/          # Interfaces and types (Book, User, Comment)
 │   ├── app-routing.module.ts
 │   └── app.module.ts
 ├── assets/              # Static resources (images, icons, styles)
 ├── environments/        # Environment settings for development and production
```

## ⚙️ How the Application Works

The Angular client sends requests to the server to fetch, add, update, or delete books.  
User interactions, such as adding or deleting comments on books, are handled through these requests.  
The server responds with data in JSON format, which is displayed dynamically on the client side.
