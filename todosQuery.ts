import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Todo = {
  id: number;
  title: string;
};

const fetchTodos = async () => {
  const { data } = await axios.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );
  return data;
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
