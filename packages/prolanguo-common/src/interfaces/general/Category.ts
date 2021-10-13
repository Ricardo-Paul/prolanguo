export interface Category{
  readonly categoryName: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: null | Date;
  readonly lastSyncedAt: null | Date;
}