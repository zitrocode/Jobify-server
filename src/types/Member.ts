export interface IMember {
  id: string;
  role: "admin" | "observer" | "collaborator";

  user_id: string;
  project_id: string;
}
