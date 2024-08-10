"use server"

import { UpdateTodo } from "@/types/todo";
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData){
    const supabase = createClient();
    const text = formData.get("todo") as string | null;

    if(!text){
        throw new Error("Text is required");
    }

    const { data: { user }} = await supabase.auth.getUser();

    if(!user){
        throw new Error("User is not logged in");
    }

    const { error } = await supabase.from("todos").insert({ user_id: user.id, task: text });
    if(error){
        throw new Error("Error adding task")
    }
    revalidatePath("/todos");
}

export async function deleteTodo(id: number){
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    if(!user){
        throw new Error("User is not logged in");
    }

    const { error } = await supabase.from("todos").delete().match({ id: id, user_id: user.id });
    if(error){
        throw new Error("Error deleting task")
    }

    revalidatePath("/todos");
}

export async function updateTodo(updateTodo: UpdateTodo){
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    if(!user){
        throw new Error("User is not logged in");
    }
    const { error } = await supabase.from("todos").update({ is_complete: updateTodo.is_complete }).match({ id: updateTodo.id, user_id: user.id });
    if(error){
        throw new Error("Error updating task")
    }
    revalidatePath("/todos");
}