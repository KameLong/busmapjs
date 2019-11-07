import {CircleMarker, LatLng, LatLngExpression, Point, Polyline} from "leaflet";

export class Service{
    public service_id="";
    public number=0;
}
export class Trip{
    public stop_times:StopTime[]=[];
    public shapes:Shape[]=[];
    public trip_id="";
    public shape_id="";
    public route_id="";
    public ur_route_id="";
    public service_id="";
}
export class Stop{
    public stop_id="";
    public stop_name="";
    public stop_lat=0;
    public stop_lon=0;
    public location_type="";
    public parent_station="";
    public platform_code="";
    public stop_number=0;
    public pickup_type=0;
    public drop_off_type=0;

    public clone():Stop{
        const result=new Stop();
        result.stop_id=this.stop_id;
        result.stop_name=this.stop_name;
        result.stop_lat=this.stop_lat;
        result.stop_lon=this.stop_lon;
        result.location_type=this.location_type;
        result.parent_station=this.parent_station;
        result.platform_code=this.platform_code;
        result.stop_number=this.stop_number;
        return result;
    }
}

export class Station{
    public stop_id:string="";
    public stop_name="";
    public children_number=0;
    public stop_lat=0;
    public stop_lon=0;
    public location_type="1";
    public parent_station="";
}
export class ApiStation{
    public id:string="";
    public name:string="";
    public lat:number=0;
    public lon:number=0;
}
export class ApiRoute{
    public stationList:Array<string>=[];
    public name:string="";
    public color:string="";
    public id:string="";
    public l_polyline:Polyline=null;
    public polyline:LatLng[]=[];
    public l_points:CircleMarker[]=null;
    public points:Point2[]=null;
}
export class Point2{
    public id="";
    public latlon:LatLng=null;
}
// export class Route{
//     public route_id="";
//     public stop_array:Stop[]=[];
//     public shape_pt_array=[];
//     public ur_route_id:string="";
//     public service_array=[];
// }

export class Calendar{
    public service_id:string="";
    public monday:string="";
    public tuesday:string="";
    public wednesday:string="";
    public thursday:string="";
    public friday:string="";
    public saturday:string="";
    public sunday:string="";
    public start_date:string="";
    public end_date:string="";

    public clone():Calendar{
        const result=new Calendar();
        result.service_id=this.service_id;
        result.monday=this.monday;
        result.tuesday=this.tuesday;
        result.wednesday=this.wednesday;
        result.thursday=this.thursday;
        result.friday=this.friday;
        result.saturday=this.saturday;
        result.sunday=this.sunday;
        result.start_date=this.start_date;
        result.end_date=this.end_date;
        return result;
    }
}
export class StopTime{
    public stop_number=0;
    public stop_id="";
    public trip_id="";
    public stop_sequence=0;
    public pickup_type=0;
    public drop_off_type=0;

}
export class Shape{
    public shape_id="";
    public shape_pt_sequence=0;
    public shape_pt_lat=0;
    public shape_pt_lon=0;

}
export class InputSetting{
    public cors_url: string="";//CORSの問題を回避するため、間にサーバーサイドのプログラムを挟む場合に前に加えるURL
    public rt:boolean =false;//GTFS-RTの読込
    public data:string ="data";//データのURL
    public data_type: string="gtfs";//データがgtfs; json; geojson; topojson; apiか
    public div_id: string="div";//挿入するdivのid
    public global:boolean =true;//trueの場合、値をc_globalに渡し、変更可能にする
    public change: boolean=true;
    public leaflet: boolean=true;
    public clickable:boolean =true;//線等をクリックできる
    public timetable:boolean =true;//時刻表を表示する
    public direction:boolean =true;
    public parent_route_id:string="route_id";
    public stop_name: boolean=true;
    public stop_name_overlap:boolean=true;
    public zoom_level:number =16;
    public svg_zoom_level:number =16; //互換性のため残す
    public svg_zoom_ratio: number=0; //SVG表示縮小率=zoom_level - svg_zoom_level
    public background_map: boolean=true;
    public background_layers=[["https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {attribution: "<a href=\"https://maps.gsi.go.jp/development/ichiran.html\">地理院タイル</a>", opacity: 0.25}]];
    public font_size:number =16; //停留所名のフォントサイズ
    public font_family: string="'源ノ角ゴシック'"; //停留所名のフォント、二重のクオーテーションマークに注意
    public stop_color_standard:string ="#000000"; //通常の停留所記号の色
    public stop_color_nonstandard:string ="#FFFFFF"; //起終点等の停留所記号の色
    public stop_color_location:string ="#C0C0C0"; //位置を示す停留所記号の色
    public stop_stroke_color:string ="#000000"; //停留所記号の縁の色
    public stop_stroke_width:number =1; //停留所記号の縁の太さ
    public show_stop_location:boolean =true; //停留所位置の記号を表示
    public stop_direction:boolean =true; //停留所記号を三角形にして向きを明示
    public min_space_width:number =2; //線の間隔の最小幅
    public min_width:number =4; //線の最小幅
    public max_width:number =8; //線の最大幅
    public round:boolean =true //; //角を丸める
}
