const publicIp = require('public-ip');
const iplocation = require("iplocation").default;


 
(async () => {
    iplocation(await publicIp.v4())
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
})();


