import { Pagination } from "@refinedev/core";
import { CrudQueryObj } from 'nestjs-prisma-crud';

export const handlePagination = (
  query: CrudQueryObj,
  pagination?: Pagination
) => {
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  if (mode === "server") {
    query.pageSize = pageSize
    query.page = current
  }

  return query;
};
