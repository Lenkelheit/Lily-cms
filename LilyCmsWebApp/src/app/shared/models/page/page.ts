import { BaseEntity } from "../base/base-entity";
import { Searchable } from "../base/searchable";

export interface Page extends BaseEntity, Searchable {
    siteId: string;
}
