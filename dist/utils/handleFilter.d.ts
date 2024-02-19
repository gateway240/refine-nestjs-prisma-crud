import { CrudFilters, CrudFilter } from "@refinedev/core";
import { CrudQueryObj, CrudWhere } from 'nestjs-prisma-crud';
export declare const generateSearchFilter: (filters: CrudFilters) => CrudWhere;
export declare const createSearchQuery: (filter: CrudFilter) => CrudWhere;
export declare const handleFilter: (query: CrudQueryObj, filters?: CrudFilters) => CrudQueryObj;
//# sourceMappingURL=handleFilter.d.ts.map