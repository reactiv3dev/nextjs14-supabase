import { Database } from "./supabase";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];

export type UpdateTodo = Database["public"]["Tables"]["todos"]["Update"]