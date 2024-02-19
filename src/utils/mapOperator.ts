import { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators) => {
  switch (operator) {
    case "and":
      return "AND";
    case "or":
      return "OR";
    case "eq":
      // return CondOperator.EQUALS;
    case "ne":
      // return CondOperator.NOT_EQUALS;
    case "lt":
      // return CondOperator.LOWER_THAN;
    case "gt":
      // return CondOperator.GREATER_THAN;
    case "lte":
      // return CondOperator.LOWER_THAN_EQUALS;
    case "gte":
      // return CondOperator.GREATER_THAN_EQUALS;
    case "in":
      // return CondOperator.IN;
    case "nin":
      // return CondOperator.NOT_IN;
    case "contains":
      // return CondOperator.CONTAINS_LOW;
    case "ncontains":
      return "notIn";
    case "containss":
      // return CondOperator.CONTAINS;
    case "ncontainss":
      // return CondOperator.EXCLUDES;
    case "null":
      // return CondOperator.IS_NULL;
    case "nnull":
      // return CondOperator.NOT_NULL;
    case "startswith":
      // return CondOperator.STARTS_LOW;
    case "startswiths":
      // return CondOperator.STARTS;
    case "endswith":
      // return CondOperator.ENDS_LOW;
    case "endswiths":
      // return CondOperator.ENDS;
    default:
      return "";
  }
};
