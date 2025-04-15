"use client";

import { Todo } from "@/todosQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export const AddTodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const client = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo,
      );
      return data;
    },
    onMutate: async (newTodo) => {
      await client.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = client.getQueryData<Todo[]>(["todos"]);

      client.setQueryData<Todo[]>(["todos"], (old = []) => [newTodo, ...old]);

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      client.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodoMutation.mutate({
      title: newTodo,
      id: Date.now(),
    });
    setNewTodo("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 p-3 text-gray-700 placeholder-gray-400 shadow-sm transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Add new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          className="h-[49px] cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:from-blue-600 hover:to-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};
