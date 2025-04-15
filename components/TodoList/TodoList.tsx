"use client";

import TrashIcon from "@/public/Trash_Empty.svg";
import { useTodos } from "@/todosQuery";
import { Todo } from "@/todosQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const TodoList = () => {
  const todos = useTodos();

  const client = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      return data;
    },
    onMutate: async (id: number) => {
      await client.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = client.getQueryData<Todo[]>(["todos"]);
      client.setQueryData<Todo[]>(["todos"], (old = []) => {
        return old.filter((todo) => todo.id !== id);
      });
      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      client.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      {todos.isLoading && <p>Loading...</p>}
      {todos.isError && <p>Error: {todos.error.message}</p>}
      {todos.isSuccess && (
        <ul className="space-y-3">
          {todos.data?.length === 0 && (
            <p className="text-center text-gray-500">List is empty 💤</p>
          )}
          {todos.data?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-xl bg-gray-100 p-3 shadow-sm"
            >
              <span className="text-gray-800">{todo.title}</span>
              <button
                onClick={() => deleteTodoMutation.mutate(todo.id)}
                aria-label="delete todo"
                className="cursor-pointer text-red-500 transition hover:text-red-700"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
