const geoip = require('geoip-lite');
const ip = "186.182.46.144";

const geo = geoip.lookup(ip);

console.log(geo);