export class task {
  id!: Number;
  title!: string;
  description!: string;
  status!: string;
  deadline!: string;
  priority!: string;
  user!:{
    id: Number;
    username: String;
  };
  created_at!: string;
  updated_at!: string;
  concluded_at!: string;
}
