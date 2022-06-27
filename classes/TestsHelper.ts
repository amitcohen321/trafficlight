import { Row } from "read-excel-file";
import {EOperatingSystem, TVisitor} from "../models/model";
const userAgentParser = require('ua-parser-js');

export class TestsHelper {
    constructor() { }

    static beautifyExcelRawData(data: Row[]): TVisitor[] {
        data.shift()

        return data.map((visitor: Row): TVisitor => {
            return <TVisitor>{
                row: visitor[0],
                ip_address: visitor[1],
                user_agent: visitor[2],
                country: visitor[3],
                os: visitor[4],
                url: visitor[5]
            }
        })
    }

    static locateAllMaliciousBots(visitors: TVisitor[]) : TVisitor[] {
        return visitors.filter(visitor => {
            let osData = this.standardizeOsName(visitor.os.toString().toUpperCase())
            let osUserAgent: string = this.standardizeOsName(userAgentParser(visitor.user_agent).os.name.toUpperCase())

            return osData !== osUserAgent
        })
    }

    private static standardizeOsName(os: string): string {
        const operatingSystemsMapping = {
            'MAC OS': EOperatingSystem.MAC,
            'SLACKWARE': EOperatingSystem.LINUX,
            'UBUNTU': EOperatingSystem.LINUX,
            'ARCHLINUX': EOperatingSystem.LINUX,
            'default': os
        };

        return (operatingSystemsMapping[os] || operatingSystemsMapping['default'])
    }
}