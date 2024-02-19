import { CrudSorting } from "@refinedev/core";
import { CrudQuery } from "nestjs-prisma-crud";
export type SortBy = Array<any>;
export declare const generateSort: (sort?: CrudSorting) => SortBy | undefined;
export declare const handleSort: (query: CrudQuery, sorters?: CrudSorting) => CrudQuery;
//# sourceMappingURL=handleSort.d.ts.map