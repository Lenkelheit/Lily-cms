export interface PageFeedback {
    id: string;
    vote: boolean;
    userEmail: string;
    comment: string;
    createdAt: Date;
    modifiedAt: Date;
    pageId: string;
}