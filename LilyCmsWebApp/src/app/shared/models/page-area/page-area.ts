import { BaseEntity } from "../base/base-entity";
import { ContentType } from "../enums/content-type";

export interface PageArea extends BaseEntity {
    content: string;
    contentType: ContentType;
    pageId: string;
}