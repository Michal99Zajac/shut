// import schema builder
import builder from './builder'

// install domains
import '#/books/graphql'

// create schema
const schema = builder.toSchema()

export default schema
