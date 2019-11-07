//元データの段階では、ur_stopsのみ、parent_stationのみ、両方の3択
//基本はur_stopsのみでparent_stationsは平均をとって自動生成
//過去のur_stopsがわからない場合はparent_stationsのみ
//標柱の区別はplatform_codeを用いる（上り・下り、路線等の区分、乗場番号等）
//同名停留所があるときの区別語（地域名、路線名等）をどうするか？distinction_code？

//統合はstop_nameで行う（緯度経度から位置を確認すべきか？）
//親も一応用意する
//
// import {Calendar, Station, ApiRoute, Stop, StopTime, Trip, Route, Shape, Service} from "./a_hanyou";
//
// export class BmdInput{
// 	public stops:Array<Stop>=[];
// 	public calendar:Array<Calendar>=[];
// 	public stop_times:StopTime[]=[];
// 	public trips:Trip[]=[];
// 	public shapes:Shape[]=[];
// 	public routes:Route[]=[];
//
// }
// export class BmdOutput{
// 	public stops:Array<Stop>=[];
// 	 public rt:string=null;
// 	public calendar:Array<Calendar>=[];
// 	public ur_stops:Array<Stop>=[];
// 	public parent_stations:Station[]=[];
// 	public trips:Trip[]=[];
// 	public ur_routes:Route[]=[];
// }

// export function f_make_bmd(a_data:BmdInput):BmdOutput {
// 	const c_bmd=new BmdOutput();
// 	c_bmd["stops"] = a_data["stops"]; //仮
// 	c_bmd["rt"] = null; //仮
// 	//[1]calendar
// 	for(let calendar of a_data["calendar"]){
// 		c_bmd["calendar"].push(calendar.clone());
// 	}
// 	//[2]ur_stops
// 	//ur_stopをまとめる（ur_stopは標柱も親未設定の停留所の代表点もありうる）
// 	for (let c_stop of a_data.stops) {
// 		const c_location_type = c_stop["location_type"];
// 		if (c_location_type === "0" || c_location_type === "" || c_location_type === undefined) {//ur_stop
// 			c_bmd.ur_stops.push(c_stop.clone());
// 		}
// 	}
// 	//[3]parent_stations
// 	//親をつくる
// 	//親が未設定の場合に、stop_nameを設定する
// 	for (let c_ur_stop of c_bmd.ur_stops) {
// 		if (c_ur_stop.parent_station === "" || c_ur_stop.parent_station === undefined) {
// 			c_ur_stop.parent_station = c_ur_stop.stop_name;//stop_nameで代用する
// 		}
// 	}
// 	//親の一覧を作る
// 	//親の緯度経度は子達の相加平均とするため、和を計算する
// 	const c_parent_station_list: { [key: string]: Station; }  ={};
// 	for (let i2 = 0; i2 < c_bmd.ur_stops.length; i2++) {
// 		const c_ur_stop = c_bmd.ur_stops[i2];
// 		const c_parent_station = c_ur_stop.parent_station;
// 		if (c_parent_station_list[c_parent_station] === undefined) {
// 			c_parent_station_list[c_parent_station] = new Station();
// 		}
// 		c_parent_station_list[c_parent_station].stop_lat += c_ur_stop.stop_lat;
// 		c_parent_station_list[c_parent_station].stop_lon += c_ur_stop.stop_lon;
// 		c_parent_station_list[c_parent_station]["children_number"] += 1;
//
// 	}
// 	//緯度経度の和から平均を計算
// 	for (let i2 in c_parent_station_list) {
// 		const c_inverse_number = 1 / c_parent_station_list[i2]["children_number"];
// 		c_parent_station_list[i2].stop_lat *= c_inverse_number;
// 		c_parent_station_list[i2].stop_lon *= c_inverse_number;
// 	}
// 	//stop_idの目次を作る
// 	const c_stop_id_index : { [key: string]: Stop } = {};
// 	for (let i2 = 0; i2 < a_data["stops"].length; i2++) {
// 		const c_stop = a_data["stops"][i2];
// 		c_stop_id_index[c_stop.stop_id] = a_data["stops"][i2];
// 	}
// 	//parent_stationsを作る
// 	for (let i2 in c_parent_station_list) {
// 		if (c_stop_id_index[i2] === undefined) {//元データにないとき
// 			const parentStation=new Station();
// 			parentStation.stop_id=i2;
// 			parentStation.stop_name=i2;
// 			parentStation.stop_lat=c_parent_station_list[i2].stop_lat;
// 			parentStation.stop_lon=c_parent_station_list[i2].stop_lon;
// 			parentStation.location_type="1";
// 			parentStation.parent_station="";
// 			c_bmd.parent_stations.push(parentStation);
// 		} else {//元データにあるとき
// 			const parentStation=new Station();
// 			parentStation.stop_id=i2;
// 			parentStation.stop_name=c_stop_id_index[i2].stop_name;
// 			parentStation.stop_lat=c_parent_station_list[i2].stop_lat;
// 			parentStation.stop_lon=c_parent_station_list[i2].stop_lon;
// 			parentStation.location_type="1";
// 			parentStation.parent_station="";
// 			c_bmd.parent_stations.push(parentStation);
//
// 		}
// 	}
// 	if (a_data.stop_times === undefined) {
// 		//stop_index（stop_number）を追加（互換性のため）
// 		const c_stop_number : { [key: string]: number }= {};
// 		for (let i2 = 0; i2 < c_bmd.ur_stops.length; i2++) {
// 			c_stop_number[ c_bmd.ur_stops[i2].stop_id] = i2;
// 		}
// 		for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 			for (let i3 = 0; i3 < c_bmd.trips[i2].stop_times.length; i3++) {
// 				c_bmd.trips[i2].stop_times[i3].stop_number = c_stop_number[ c_bmd.trips[i2].stop_times[i3].stop_id];
// 			}
// 		}
// 		for (let i2 = 0; i2 < c_bmd.ur_routes.length; i2++) {
// 			for (let i3 = 0; i3 < c_bmd.ur_routes[i2].stop_array.length; i3++) {
// 				c_bmd.ur_routes[i2].stop_array[i3].stop_number = c_stop_number[c_bmd.ur_routes[i2].stop_array[i3].stop_id];
// 			}
// 		}
// 		return c_bmd;
// 	}
//
//
// 	//[4]trips
// 	for (let i2 = 0; i2 < a_data.trips.length; i2++) {
// 		const c_trip:Trip=a_data.trips[i2].clone();
// 		c_bmd.trips.push(c_trip);
// 	}
// 	//stop_timesをtripsにまとめる。
// 	const c_trip :{[key:string]:Trip}= {}; //全体で使う目次
// 	for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 		c_trip[c_bmd.trips[i2].trip_id] = c_bmd.trips[i2];
// 	}
// 	for (let i2 = 0; i2 < a_data.stop_times.length; i2++) {
// 		const c_stop_time :StopTime=a_data.stop_times[i2].clone();
//
// 		if (c_trip[c_stop_time.trip_id] === undefined) {
// 			c_trip[c_stop_time.trip_id] = new Trip();
// 		}
// 		c_trip[c_stop_time.trip_id].stop_times.push(c_stop_time);
// 	}
// 	//並び替え
// 	for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 		c_bmd.trips[i2].stop_times.sort(function(a1:StopTime,a2:StopTime) {
// 			if (a1.stop_sequence < a2.stop_sequence) {
// 				return -1;
// 			}
// 			if (a1.stop_sequence > a2.stop_sequence) {
// 				return 1;
// 			}
// 			return 0;
// 		});
// 	}
// 	//c_shape_index
// 	const c_shape_index :{[key:string]:Shape[]}= {};
// 	for (let i2 = 0; i2 < a_data.shapes.length; i2++) {
// 		c_shape_index[a_data.shapes[i2].shape_id] = [];
// 	}
// 	for (let i2 = 0; i2 < a_data.shapes.length; i2++) {
// 		const c_shape:Shape = a_data.shapes[i2].clone();
// 		c_shape_index[c_shape.shape_id].push(c_shape);
// 	}
// 	//並び替え
// 	for (let i2 in c_shape_index) {
// 		c_shape_index[i2].sort(function(a1:Shape,a2:Shape) {
// 			if (a1.shape_pt_sequence < a2.shape_pt_sequence) {
// 				return -1;
// 			}
// 			if (a1.shape_pt_sequence > a2.shape_pt_sequence) {
// 				return 1;
// 			}
// 			return 0;
// 		});
// 	}
// 	//shapesをtripsにまとめる。
// 	for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 		const c_shapes = c_shape_index[c_bmd.trips[i2].shape_id];
// 		for (let shape of c_shapes) {
// 			c_bmd.trips[i2].shapes.push(shape.clone());
// 		}
// 	}
// 	//[5]ur_routes
// 	//ur_routesをつくる
// 	const c_route_index:{[key:string]:Route} = {};
// 	for (let i2 = 0; i2 < a_data.routes.length; i2++) {
// 		c_route_index[a_data.routes[i2].route_id] = a_data.routes[i2];
// 	}
// 	for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 		const c_trip = c_bmd.trips[i2];
// 		//既に同じur_routeがあるか探す。
// 		let l_exist = false; //違うと仮定
// 		for (let i3 = 0; i3 < c_bmd.ur_routes.length; i3++) {
// 			const c_ur_route: Route = c_bmd.ur_routes[i3];
// 			if (c_ur_route.route_id !== c_trip.route_id || c_ur_route.stop_array.length !== c_trip.stop_times.length || c_ur_route.shape_pt_array.length !== c_trip.shapes.length) {
// 				continue; //違う
// 			}
// 			l_exist = true; //同じと仮定
// 			for (let i4 = 0; i4 < c_ur_route.stop_array.length; i4++) {
// 				if (c_ur_route.stop_array[i4].stop_id !== c_trip.stop_times[i4].stop_id || c_ur_route.stop_array[i4].pickup_type !== c_trip.stop_times[i4].pickup_type || c_ur_route.stop_array[i4].drop_off_type !== c_trip.stop_times[i4].drop_off_type) {
// 					l_exist = false; //違う
// 					break;
// 				}
// 			}
// 			for (let i4 = 0; i4 < c_ur_route.shape_pt_array.length; i4++) {
// 				if (c_ur_route.shape_pt_array[i4].shape_pt_lat !== c_trip.shapes[i4].shape_pt_lat || c_ur_route.shape_pt_array[i4].shape_pt_lon !== c_trip.shapes[i4].shape_pt_lon) {
// 					l_exist = false; //違う
// 					break;
// 				}
// 			}
// 			if (l_exist === true) { //同じものが見つかったとき
// 				c_trip.ur_route_id = c_ur_route.ur_route_id;
// 				let l_exist_2 = false;
// 				for (let i4 = 0; i4 < c_ur_route.service_array.length; i4++) {
// 					if (c_ur_route.service_array[i4].service_id === c_trip.service_id) {
// 						c_ur_route.service_array[i4].number += 1;
// 						l_exist_2 = true;
// 					}
// 				}
// 				if (l_exist_2 === false) {
// 					const service = new Service();
// 					service.service_id = c_trip.service_id;
// 					service.number = 1;
// 					c_ur_route.service_array.push(service);
// 				}
// 				break;
// 			}
//
// 		}
// 		if (l_exist === false) { //見つからないとき
// 			c_trip.ur_route_id = String(i2);
// 			const c_ur_route=c_route_index[c_trip.route_id].clone();
// 			c_ur_route.ur_route_id=String(i2);
// 			const service=new Service();
// 			service.service_id=c_trip.service_id;
// 			service.number=1;
// 			c_ur_route.service_array.push(service);
// 			for (let stop of c_trip.stop_times) {
// 				c_ur_route.stop_array.push(stop.clone());
// 			}
// 			for (let i3 = 0; i3 < c_trip.shapes.length; i3++) {
// 				const c_shape = {};
// 				c_ur_route.shape_pt_array.push(c_trip.shapes[i3].clone());
// 			}
// 			c_bmd.ur_routes.push(c_ur_route);
// 		}
// 	}
// 	//並び替え
// 	const c_route_number:{[key:string]:number} = {};
// 	for (let i2 = 0; i2 < a_data.routes.length; i2++) {
// 		c_route_number[a_data.routes[i2].route_id] = i2;
// 	}
// 	c_bmd.ur_routes.sort(function(a1,a2) {
// 		if (c_route_number[a1.route_id] < c_route_number[a2.route_id]) {
// 			return -1;
// 		}
// 		if (c_route_number[a1.route_id] > c_route_number[a2.route_id]) {
// 			return 1;
// 		}
// 		return 0;
// 	});
//
// 	//stop_index（stop_number）を追加（互換性のため）
// 	const c_stop_number:{[key:string]:number} = {};
// 	for (let i2 = 0; i2 < c_bmd.ur_stops.length; i2++) {
// 		c_stop_number[c_bmd.ur_stops[i2].stop_id] = i2;
// 	}
// 	for (let i2 = 0; i2 < c_bmd.trips.length; i2++) {
// 		for (let i3 = 0; i3 < c_bmd.trips[i2].stop_times.length; i3++) {
// 			c_bmd.trips[i2].stop_times[i3].stop_number = c_stop_number[c_bmd.trips[i2].stop_times[i3].stop_id];
// 		}
// 	}
// 	for (let i2 = 0; i2 < c_bmd.ur_routes.length; i2++) {
// 		for (let i3 = 0; i3 < c_bmd.ur_routes[i2].stop_array.length; i3++) {
// 			c_bmd.ur_routes[i2].stop_array[i3].stop_number = c_stop_number[c_bmd.ur_routes[i2].stop_array[i3].stop_id];
// 		}
// 	}
// 	return c_bmd;
// }
