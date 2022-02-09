import { LessonType } from "../../enums";

export interface LessonResult{
  readonly lessonResultId: string;
  readonly setId: string;
  readonly lessonType: LessonType;
  readonly poorCount: number;
  readonly fairCount: number;
  readonly goodCount: number;
  readonly greatCount: number;
  readonly superbCount: number;
  readonly totalCount: number;
  readonly createdAt: Date;
}