import { HttpServiceInterface } from "../domain/services/interfaces/httpService.interface.js"
import { FD_API_KEY } from "../shared/config.js"

class fdApiAdapter implements HttpServiceInterface {
	private headers: Headers
	constructor() {
		this.headers = new Headers()
		this.headers.append("X-Auth-Token", FD_API_KEY)
	}

	public async call(method: string, url: string, data?: any): Promise<any> {
		const requestOptions = {
			method: method,
			headers: this.headers,
		}
		let resp: any = await (await fetch(url, requestOptions)).json()
		return resp
	}
}

export default new fdApiAdapter()
