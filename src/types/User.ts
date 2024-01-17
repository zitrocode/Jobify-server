export interface IUser {
  id: string;
  name: string;
  biography: string | null;
  profile_picture: string | null;

  auth_id: string;
}
