import { CrudQueryObj } from "nestjs-prisma-crud";

export const handleJoin = (
  query: CrudQueryObj,
  join?: string[]
) => {
  if (join) {
    // query.setJoin(join);
  }
  return query;
};
