const geoip = require('geoip-lite');
const ip = "172.18.211.130";

const geo = geoip.lookup(ip);

console.log(geo);