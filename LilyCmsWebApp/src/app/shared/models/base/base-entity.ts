export interface BaseEntity {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    createdAt: Date;
    modifiedAt: Date;
}
