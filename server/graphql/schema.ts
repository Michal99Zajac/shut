// import schema builder
import builder from './builder'

// install domains
import '#/auth/graphql'

// create schema
const schema = builder.toSchema()

export default schema
