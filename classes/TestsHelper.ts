import { Row } from "read-excel-file";
import { TVisitor } from "../models/model";
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
            let osData = visitor.os.toString().toUpperCase()
            let osUserAgent = userAgentParser(visitor.user_agent).os.name.toString().toUpperCase()

            osUserAgent = (osUserAgent === 'MAC OS') ? 'MAC' : osUserAgent

            return osData !== osUserAgent
        })
    }
}