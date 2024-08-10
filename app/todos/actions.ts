"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData){
    const supabase = await createClient();
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