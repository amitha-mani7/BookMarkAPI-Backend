import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    repoId: string;

    @Column()
    repoName: string;

    @Column()
    repoUrl: string;

    @Column()
    bookmarkedAt: Date;

    @ManyToOne(() => Users, user => user.bookmarks)
    user: Users;
}
