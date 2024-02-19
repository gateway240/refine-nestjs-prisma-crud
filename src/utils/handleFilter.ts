import { CrudFilters, CrudFilter } from "@refinedev/core";
import { mapOperator } from "./mapOperator";
import { CrudQueryObj, CrudWhere } from 'nestjs-prisma-crud';

export const generateSearchFilter = (filters: CrudFilters): CrudWhere => {
  return createSearchQuery({
    operator: "and",
    value: filters,
  });
};

export const createSearchQuery = (filter: CrudFilter): CrudWhere => {
  if (
    filter.operator !== "and" &&
    filter.operator !== "or" &&
    "field" in filter
  ) {
    if (filter.operator === "eq") {
      return {[filter.field]: filter.value}
    }
    // query
    return {
      [filter.field]: {
        [mapOperator(filter.operator)]: filter.value,
      },
    };
  }

  const { operator } = filter;

  return {
    [mapOperator(operator)]: filter.value.map((filter) =>
      createSearchQuery(filter)
    ),
  };
};

export const handleFilter = (
  query: CrudQueryObj,
  filters?: CrudFilters
) => {
  if (filters && query) {
    query.where = generateSearchFilter(filters);
  }
  return query;
};
