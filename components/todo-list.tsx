import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";

import { Todo } from "@/types/todo";

export type Action = "delete" | "update" | "create";



export function TodoList({ todos }: { todos: Array<Todo> }) {
  return (
    <>
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        {todos?.map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </div>
    </>
  );
}
