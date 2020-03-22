
export const getLocalCity = () => {
    return new Promise((resolve, reject) => {
        const myCity = new window.BMap.LocalCity();
        myCity.get(function (result) {
            resolve(result)
        });
    })
}