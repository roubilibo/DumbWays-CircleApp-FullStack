import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	UpdateDateColumn,
} from "typeorm";
import { Thread } from "./Thread";
import { User } from "./User";
@Entity({ name: "replies" })
export class Reply {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 500 })
	content: string;

	@Column({ type: "text", nullable: true })
	image: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updated_at: Date;

	@ManyToOne(() => User, (user) => user.replies, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
	user: User;

	@ManyToOne(() => Thread, (thread) => thread.replies, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" }) // untuk membuat foreignkey
	thread: Thread;
}
