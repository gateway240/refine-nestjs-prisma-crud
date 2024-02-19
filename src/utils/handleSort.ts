import { CrudSorting } from "@refinedev/core";
import { CrudQueryObj } from "nestjs-prisma-crud";

export type SortBy = Array<any>;

export const generateSort = (sort?: CrudSorting): SortBy | undefined => {
  if (sort && sort.length > 0) {
    const multipleSort: SortBy = [];
    sort.map(({ field, order }) => {
      if (field && order) {
        multipleSort.push({[field]: order});
      }
    });
    return multipleSort;
  }

  return;
};

export const handleSort = (
  query: CrudQueryObj,
  sorters?: CrudSorting
) => {
  const sortBy = generateSort(sorters);
  if (sortBy) {
    query.orderBy = sortBy;
  }

  return query;
};
