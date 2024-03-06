export interface CacheServiceInterface {
	saveInCache: (key: string, value: any) => Promise<void>
	getFromCache: (key: string) => Promise<string>
}
