import {Data_a_api_Input, Data_a_api_Output} from "./io";

export function f_from_api(a_api:Data_a_api_Input):Data_a_api_Output {
	const c_stops = [];
	const c_ur_routes = [];
	for (let stop of a_api.station) {
		c_stops.push(stop.clone());
	}
	for (let m_route of a_api.route) {
		const route=m_route.clone();


		for (let i2 = 0; i2 < a_api.route[i1].stationList.length; i2++) {
			c_stop_array.push({"stop_id": a_api.route[i1].stationList[i2]});
		}
		c_ur_routes.push({
			"route_id": a_api.route[i1].id,
			"route_short_name": a_api.route[i1].name,
			"route_long_name": a_api.route[i1].name,
			"jp_parent_route_id": a_api.route[i1].name,
			"route_color": a_api.route[i1].color.replace(/#/, ""),
			"stop_array": c_stop_array//,
		});
	}
	return {"stops": c_stops, "ur_routes": c_ur_routes};
}

