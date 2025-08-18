import { Query } from "mongoose";

interface QueryString {
  [key: string]: any;
}

class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: QueryString;

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    console.log(
      "this.queryString",
      this.queryString
    )
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }



  paginate(): this {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
