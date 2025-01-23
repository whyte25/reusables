"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast-provider";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function ToastPromiseDemo() {
  const fetchTodo = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch todo");
    }
    return response.json() as Promise<Todo>;
  };

  const createTodo = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: "New Todo",
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      throw new Error("Failed to create todo");
    }
    return response.json() as Promise<Todo>;
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast.promise(fetchTodo, {
            loading: "Fetching todo...",
            success: (data) => `Fetched todo: ${data.title}`,
            error: "Failed to fetch todo!",
          })
        }
      >
        Resolved Promise
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          toast.promise(createTodo, {
            loading: "Creating new todo...",
            success: (data) => `Created todo: ${data.title}`,
            error: "Failed to create todo!",
          })
        }
      >
        Rejected promise
      </Button>
    </div>
  );
}
