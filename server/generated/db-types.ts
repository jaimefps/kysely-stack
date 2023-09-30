import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Member = {
    id: Generated<number>;
    updatedAt: Generated<Timestamp>;
    createdAt: Generated<Timestamp>;
    firebase_id: string;
    username: string;
};
export type Task = {
    id: Generated<number>;
    updatedAt: Generated<Timestamp>;
    createdAt: Generated<Timestamp>;
    complete: Generated<boolean>;
    title: string;
};
export type DB = {
    Member: Member;
    Task: Task;
};
