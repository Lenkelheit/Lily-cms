import { Site } from "src/app/shared/models/site";

export interface EditSite {
    site: Site;
    usedUniqueUrls: string[];
    isNewItem: boolean;
}
