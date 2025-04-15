import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600">
          Todo App
        </h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </section>
  );
}
