import { Site } from "src/app/shared/models/site/site";
import { BaseEditEntity } from "./base-edit-entity";

export interface EditSite extends BaseEditEntity {
    site: Site;
}
