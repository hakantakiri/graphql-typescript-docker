import { RedisClientType, createClient } from "redis"
import { CacheServiceInterface } from "../domain/services/interfaces/cacheService.interface.js"
import { REDIS_HOST, REDIS_PORT } from "../shared/config.js"

class RedisAdapter implements CacheServiceInterface {
	private redisClient: RedisClientType
	constructor() {
		this.redisClient = createClient({
			socket: {
				host: REDIS_HOST,
				port: Number(REDIS_PORT),
			},
		})
		this.redisClient.connect()
	}

	public saveInCache = async (key: string, value: any): Promise<void> => {
		await this.redisClient.set(key, value)
	}
	public getFromCache = async (key: string): Promise<string> => {
		return await this.redisClient.get(key)
	}
}

export default new RedisAdapter()
