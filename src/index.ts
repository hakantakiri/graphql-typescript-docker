import { startApolloServer } from "./api/graphql/index.js"
import { BACKEND_PORT } from "./shared/config.js"

const main = async () => {
	startApolloServer(BACKEND_PORT)
}

await main()
