import { BaseEntity } from "../base/base-entity";
import { Searchable } from "../base/searchable";

export interface PageDetails extends BaseEntity, Searchable {
    siteId: string;

    // todo: add page areas
}