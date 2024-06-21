import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bookmark } from "./BookMark";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  
  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];
}
