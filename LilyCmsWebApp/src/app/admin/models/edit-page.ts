import { Page } from "src/app/shared/models/page/page";
import { BaseEditEntity } from "./base-edit-entity";

export interface EditPage extends BaseEditEntity {
    page: Page;
    siteUrl: string;
}