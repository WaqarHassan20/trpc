# 🔄 Express vs tRPC - Side by Side

## 📝 Code Comparison

### Express (Traditional Way)
```javascript
app.get("/todo", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  
  // do database stuff
  
  res.json({ title, description, done: false, id: 1 });
});
```

### tRPC (Modern Way)
```typescript
import { router, publicProcedure } from "./trpc";
import { z } from "zod";

const appRouter = router({
  todoCreate: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
    }))
    .query(async (opts) => {
      let { title, description } = opts.input;
      
      // do database logic
      
      return { id: 1, title, description };
    }),
});

export type AppRouter = typeof appRouter;
```

---

## 🎯 Quick Translation Guide

| Express | tRPC | Purpose |
|---------|------|---------|
| `app` | `router` | Main application/router |
| `app.get()` | `.query()` | **Fetch** data (GET) |
| `app.post()` | `.mutation()` | **Change** data (POST/PUT/DELETE) |
| `/todo` | `todoCreate` | Endpoint/Procedure name |

---

## 📚 Complete Terminology Comparison

### Express Terms vs tRPC Equivalents

| Express Concept | tRPC Equivalent | What It Does |
|----------------|-----------------|--------------|
| **Routes** (`/api/user`) | **Procedures** (`user.get`) | Define API endpoints |
| **Middleware** (`app.use()`) | **Middleware** (`.use()`) | Run code before handling request |
| **Request Body** (`req.body`) | **Input** (`.input()`) | Data sent from client |
| **Response** (`res.json()`) | **Return** (just `return`) | Send data back to client |
| **Route Parameters** (`req.params`) | **Input Schema** (`z.object()`) | URL/path parameters |
| **Query Strings** (`req.query`) | **Input Schema** (`z.object()`) | Query parameters (?key=value) |
| **Express Router** (`express.Router()`) | **tRPC Router** (`t.router()`) | Group related endpoints |
| **Error Handling** (`try/catch`) | **TRPCError** (`throw new TRPCError()`) | Handle errors |
| **Custom Middleware** | **Context** (`createContext`) | Share data across requests |
| **app.put()** | `.mutation()` | Update data |
| **app.delete()** | `.mutation()` | Delete data |
| **app.patch()** | `.mutation()` | Partial update |
| **Status Codes** (`res.status()`) | **TRPCError codes** | HTTP response codes |
| **Validation** (manual/libraries) | **Zod/Input Validators** | Validate incoming data |
| **Type Safety** (❌ None) | **TypeScript Types** (✅ Built-in) | Catch errors at compile time |

### Additional tRPC-Only Features

| tRPC Feature | Description | Why It's Awesome |
|-------------|-------------|------------------|
| **Subscriptions** | Real-time data streaming | Like WebSockets but typed! |
| **Batching** | Multiple requests in one call | Faster performance |
| **Links** | Customize request/response flow | Add logging, auth, etc. |
| **Proxy Client** | Call server functions directly | Feels like local functions |
| **Meta** | Add metadata to procedures | Document your API |
| **mergeRouters** | Combine multiple routers | Organize large apps |

---

## 📖 How Server & Client working together in the 
## directory server/index.ts and client/index.ts

In our tRPC setup, the **server** (`server/index.ts`) acts as the brain that defines what functions are available. It creates a **router** (similar to `app` in Express) and defines two **procedures**: `createTodo` and `getTodo`. The `createTodo` is a **mutation** (like POST in REST) that accepts input validated by **Zod schema** - it requires a `title` and `description` as strings. The `getTodo` is a **query** (like GET in REST) that fetches todos without needing any input. The server uses `createHTTPServer` to start listening on port 3000. Here's the magic part: at the end, the server **exports the TYPE** of the router (`export type AppRouter = typeof appRouter`) - notice it's just the TYPE, not the actual code!

On the other side, the **client** (`client/index.ts`) imports this TYPE definition using `import type { AppRouter } from '../server'`. It then creates a **tRPC Proxy Client** using `createTRPCProxyClient<AppRouter>` which connects to the server via `httpBatchLink` pointing to `http://localhost:3000`. Now here's where it gets beautiful - the client can call server functions as if they were local! When you write `trpc.createTodo.mutate({ title: "Go to gym", description: "..." })`, TypeScript knows exactly what parameters are needed and what will be returned because of that imported `AppRouter` type. Similarly, `trpc.getTodo.query()` fetches todos with full autocomplete and type checking. The client sends the request over HTTP, the server validates the input with Zod, executes the function, and returns the result - all with complete type safety from end to end. No manual API documentation needed, no guessing what data shape to send, and if you change something on the server, TypeScript immediately tells the client what broke!

---

<div align="center">

**Express → tRPC** = Same logic, better types! 🚀

*Choose tRPC for type safety, Express for REST APIs* 🎯

</div> 