const BMap = window.BMap;
export const getLocalCity = () => {
    return new Promise((resolve, reject) => {
        // const myCity = new window.BMap.LocalCity();
        // myCity.get(function (result) {
        //     resolve(result)
        // });
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                var point = new window.BMap.Point(r.point.lng, r.point.lat);
                var geoc = new window.BMap.Geocoder();
                geoc.getLocation(point, function (rs) {
                    resolve({
                        name: rs.addressComponents.city.replace('市', ''),
                        point
                    })
                });
            } else {
                alert("failed" + this.getStatus());
            }
        });
    })
}
export const getPoint = (city,address) => {
    if(address){
        address = city
    }
    return new Promise((resolve, reject) => {
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(city, function (point) {
            if (point) {
                resolve(point)
            }else{
                reject(point)
            }
        },
            address);
    })
}