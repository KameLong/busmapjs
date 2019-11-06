import {ApiRoute, ApiStation, Route} from "./a_hanyou";

export class KLAPI{
	public route:{[key:string]:ApiRoute}={};
	public station:{[key:string]:ApiStation}={};

}
export function f_xhr_get(a_url:string, a_type:XMLHttpRequestResponseType):KLAPI {

	return new Promise<KLAPI>((resolve, reject) => {
		function f_reject() {
			reject(new Error("XHR失敗"));
		}
		const c_xhr = new XMLHttpRequest();
		c_xhr.responseType = a_type;
		c_xhr.open("get", a_url);
		c_xhr.onloadend = ()=>{
			console.log(c_xhr);
			if (c_xhr.status === 200) {
				resolve(c_xhr.response as KLAPI);
			} else {
				f_reject();
			}
		};
		c_xhr.onabort = f_reject;
		c_xhr.ontimeout = f_reject;
		c_xhr.send(null);
	});
}
