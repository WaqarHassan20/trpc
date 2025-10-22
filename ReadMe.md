# 🚀 tRPC - A Beginner's Guide

> **Move Fast and Break Nothing** - Build end-to-end type-safe APIs without the hassle!

---

## 📌 What is tRPC?

**tRPC** stands for **TypeScript Remote Procedure Call**. Think of it as a bridge that lets your frontend talk to your backend **safely** and **easily**.

**In simple terms:** You write functions on your server, and you can call them from your client as if they were local functions - with **full type safety**!

---

## 🤔 Why Use tRPC?

### Without tRPC 😰
```typescript
// Backend: You define an API
// Frontend: You manually type everything and hope it matches
const user = await fetch('/api/user/123');
const data = await user.json(); // ❌ No type safety!
```

### With tRPC 😎
```typescript
// Backend defines the function
// Frontend gets automatic types!
const user = await trpc.user.getById.query({ id: 123 }); 
// ✅ TypeScript knows exactly what 'user' looks like!
```

---

## 🎯 Key Benefits

| Feature | Description |
|---------|-------------|
| 🔒 **Type Safety** | Catch errors before they happen! |
| 🚫 **No Code Generation** | Types update instantly as you code |
| 🪶 **Lightweight** | Small bundle size, big impact |
| 🎨 **Great DX** | Autocompletion everywhere! |

---

## 🏗️ Basic Structure

```
📦 Your App
├── 🖥️ Server (Backend)
│   └── Define procedures (functions)
├── 🌐 Client (Frontend)
│   └── Call procedures with types
└── 🔗 tRPC Router
    └── Connects everything together
```

---

## 🧩 Core Concepts

### 1️⃣ **Procedures**
Functions that your client can call. Two types:
- **Query** - Get data (like GET requests)
- **Mutation** - Change data (like POST/PUT/DELETE)

### 2️⃣ **Router**
A collection of procedures organized together.

### 3️⃣ **Context**
Shared data available to all procedures (like user authentication, database connection).

---

## � Essential Terms & Definitions

| Term | What It Means | Simple Example |
|------|---------------|----------------|
| **Procedure** | A function on your server that clients can call | Like a button that does something when clicked |
| **Query** | A procedure that **reads/fetches** data | "Show me all users" - doesn't change anything |
| **Mutation** | A procedure that **changes** data | "Create a new user" - modifies the database |
| **Router** | A collection of related procedures | Like a menu with different food items |
| **Context** | Shared info available to all procedures | Current user info, database connection |
| **Input** | Data you send to a procedure | Parameters/arguments you pass to a function |
| **Output** | Data the procedure returns | The result you get back |
| **Middleware** | Code that runs before your procedure | Security check before entering a building |
| **Link** | How client connects to server | Like choosing WiFi vs Ethernet |
| **Subscription** | Real-time updates from server | Like getting live notifications |
| **Validator** | Checks if input data is correct | Bouncer checking ID before entry |
| **Type Safety** | TypeScript ensures no mismatches | Spell-checker for your code |
| **AppRouter** | Your main router exported for the client | The master list of all available functions |

---

## 🎓 When to Use tRPC?

### ✅ Perfect For:
- Full-stack TypeScript projects
- Teams wanting type safety end-to-end
- Projects where frontend & backend share same repo

### ❌ Maybe Not For:
- Public APIs (tRPC is for internal use)
- Non-TypeScript projects
- When you need REST/GraphQL for external consumers

---

## 📚 Getting Started

```bash

- npm install @trpc/server @trpc/client
- npm install @trpc/react-query @tanstack/react-query

```
---

## 🌟 The Bottom Line

**tRPC = Type safety + Speed + Simplicity**

It's like having a conversation between your frontend and backend where both sides always understand each other perfectly! 🎯

---

### 🌐 Related Technologies
- **[TypeScript](https://www.typescriptlang.org/)** - The foundation of tRPC
- **[Zod](https://github.com/colinhacks/zod)** - Schema validation (works great with tRPC)
- **[React Query](https://tanstack.com/query)** - For React integration
- **[Prisma](https://www.prisma.io/)** - Database ORM (pairs perfectly with tRPC)

---

## 🤝 Support

- ⭐ **Star the repo** 

---

<div align="center">

**Happy Coding!** 🚀

*Made with ❤️ for developers who love type safety*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io)

</div>
