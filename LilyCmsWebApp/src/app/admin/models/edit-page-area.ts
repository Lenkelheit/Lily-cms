import { PageArea } from "src/app/shared/models/page-area/page-area";
import { BaseEditEntity } from "./base-edit-entity";

export interface EditPageArea extends BaseEditEntity {
    pageArea: PageArea;
}