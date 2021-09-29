import { PageArea } from "src/app/shared/models/related-page-info/page-area";
import { BaseEditEntity } from "./base-edit-entity";

export interface EditPageArea extends BaseEditEntity {
    pageArea: PageArea;
}