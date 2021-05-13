import { BaseEntity } from "../base/base-entity";
import { Searchable } from "../base/searchable";
import { PageDetails } from "../page/page-details";

export interface SiteDetails extends BaseEntity, Searchable {
    pages: PageDetails[];
}