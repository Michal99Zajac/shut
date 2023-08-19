/**
 * Default query type for Pothos resolvers.
 * This type is used to define the shape of the query object.
 */
export interface Query {
  /**
   * The query include object.
   */
  include?: any
  /**
   * The query select object.
   */
  select?: any
}

export default Query
