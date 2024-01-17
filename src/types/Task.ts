export interface ITask {
  id: string;
  name: string;
  tags: string | null;
  description: string | null;
  isCompleted: boolean;
  importance: null | "low" | "medium" | "high";

  deadline: Date | null;

  user_id: string;
  space_id: string;
  project_id: string;
}
