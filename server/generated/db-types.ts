import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Happening = {
    id: Generated<number>;
    updatedAt: Generated<Timestamp>;
    createdAt: Generated<Timestamp>;
    startTime: Timestamp | null;
    endTime: Timestamp | null;
    source: string | null;
    title: string;
};
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
    Happening: Happening;
    Member: Member;
    Task: Task;
};
