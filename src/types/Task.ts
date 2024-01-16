export interface ITask {
  id: string;
  name: string;
  tags: string;

  user_id: string;
  space_id: string | null;
  project_id: string;
  isCompleted: boolean;
}
