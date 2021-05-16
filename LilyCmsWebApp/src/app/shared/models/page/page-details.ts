import { BaseEntity } from "../base/base-entity";
import { Searchable } from "../base/searchable";
import { PageArea } from "../page-area/page-area";

export interface PageDetails extends BaseEntity, Searchable {
    siteId: string;

    pageAreas: PageArea[];
}