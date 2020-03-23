
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
                        name: rs.addressComponents.city
                    })
                });
            } else {
                alert("failed" + this.getStatus());
            }
        });
    })
}