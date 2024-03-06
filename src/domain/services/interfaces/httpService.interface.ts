export interface HttpServiceInterface {
	call: (method: string, URL: string, data?: any) => Promise<any>
}
