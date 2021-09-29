import { BaseEntity } from "../base/base-entity";
import { Searchable } from "../base/searchable";
import { PageArea } from "../related-page-info/page-area";

export interface PageDetails extends BaseEntity, Searchable {
    siteId: string;

    pageAreas: PageArea[];
}