"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHelper = void 0;
const model_1 = require("../models/model");
const userAgentParser = require('ua-parser-js');
class TestsHelper {
    constructor() { }
    static beautifyExcelRawData(data) {
        data.shift();
        return data.map((visitor) => {
            return {
                row: visitor[0],
                ip_address: visitor[1],
                user_agent: visitor[2],
                country: visitor[3],
                os: visitor[4],
                url: visitor[5]
            };
        });
    }
    static locateAllMaliciousBots(visitors) {
        return visitors.filter(visitor => {
            let osData = this.standardizeOsName(visitor.os.toString().toUpperCase());
            let osUserAgent = this.standardizeOsName(userAgentParser(visitor.user_agent).os.name.toUpperCase());
            return osData !== osUserAgent;
        });
    }
    static standardizeOsName(os) {
        const operatingSystemsMapping = {
            "MAC OS": model_1.EOperatingSystem.MAC,
            "SLACKWARE": model_1.EOperatingSystem.LINUX,
            "UBUNTU": model_1.EOperatingSystem.LINUX,
            "ARCHLINUX": model_1.EOperatingSystem.LINUX,
            "default": os
        };
        return operatingSystemsMapping[os] || operatingSystemsMapping['default'];
    }
}
exports.TestsHelper = TestsHelper;
//# sourceMappingURL=TestsHelper.js.map