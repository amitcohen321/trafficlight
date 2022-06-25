import { Row } from "read-excel-file";
const parser = require('ua-parser-js');

export class TestsHelper {
    constructor() { }

    static beautifyExcelRawData(data: Row[]) {
        data.shift()

        const processedData = data.map((row: Row) => {
            return {
                "row": row[0],
                "ip_address": row[1],
                "user_agent": row[2],
                "country": row[3],
                "os": row[4],
                "url": row[5],
            }
        })

        return processedData
    }

    static locateMaliciousBots(visitors: any) : any {
        let maliciousVisitors: void[];

        maliciousVisitors = visitors.map(visitor => {
            const userAgentParsed = parser(visitor["user_agent"]);
            console.log(userAgentParsed.os.name)

            // visitor["os"] === parser(visitor["user_agent"]).os.name
        })


        return maliciousVisitors
    }



    helperFunctionTwo() {

    }
}