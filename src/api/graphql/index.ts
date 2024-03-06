import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import { resolvers } from "./resolvers.js"
import { GraphQLError } from "graphql"

const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: (formatedError) => {
		return new GraphQLError(formatedError.message)
	},
})

export const startApolloServer = async (port: number) => {
	await startStandaloneServer(server, {
		listen: { port: port },
	})
	console.log(`Running backend at port ${port}`)
}
