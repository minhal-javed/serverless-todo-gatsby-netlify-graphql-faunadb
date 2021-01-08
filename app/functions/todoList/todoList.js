const { ApolloServer, gql } = require("apollo-server-lambda")
var faunadb = require("faunadb"),
  q = faunadb.query

const typeDefs = gql`
  type Query {
    todos: [Todo!]
    
}
type Mutation{
  addTodo(task:String!):Todo
}
  type Todo {
    id: ID!
    name: String!
    married: Boolean!
  }
`

const authors = [
  { id: 1, name: "Terry Pratchett", married: false },
  { id: 2, name: "Stephen King", married: true },
  { id: 3, name: "JK Rowling", married: false },
]

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({
          secret: "fnAD-wFp4iACBXRzheyuteXafusFSHpVXt3s0xVY",
        })
        const result=await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('todos'))),
            q.Lambda(x=>q.Get(x))
          )
          // q.Create(
          //   q.Collection('todos'),
          //   {data:{d}}

          // )
        )
        console.log(result.ref.data)
        return 

      } catch (err) {
        console.log(err)
      }
    },
    // allAuthors: () => authors,
    // author: () => {},
    // authorByName: (root, args) => {
    //   console.log('hihhihi', args.name)
    //   return authors.find((author) => author.name === args.name) || 'NOTFOUND'
    // },
  },
  Mutation:{
    addTodo:(_,{task})
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
