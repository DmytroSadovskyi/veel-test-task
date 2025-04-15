# 📝 Todo App (Next.js + React Query)

A simple Todo app built with **Next.js**, **React Query**, **Axios**, and **Tailwind CSS**, using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## ✨ Features

- Fetch and display todos (`GET /todos`)
- Add new todos (`POST /todos`)
- Delete todos (`DELETE /todos/:id`)
- Optimistic UI updates for smooth user experience

## 🛠️ Technologies

- [Next.js 14](https://nextjs.org/)
- [React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🧩 Components

- `AddTodoForm`: input field and button to add todos
- `TodoList`: displays todos and allows deletion
- `QueryProvider`: wraps the app to provide React Query functionality
- `todosQuery`: React Query logic for fetching todos

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/DmytroSadovskyi/veel-test-task.git
cd veel-test-task
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
