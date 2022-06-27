import { expect, test } from '@playwright/test';
import * as path from 'path'
import { testsConfig } from '../testsConfig'
import { TestsHelper } from "../classes/TestsHelper";
import readXlsxFile from "read-excel-file/node";
import { TVisitor } from "../models/model";

test.describe('Find Malicious Bots', () => {
    test('If a specified IP address is found as an origin of a malicious bot, pass the test', async () => {
        const data: TVisitor[] = await getData()
        const maliciousBots: TVisitor[] = TestsHelper.locateAllMaliciousBots(data)
        const isIpFound: boolean = maliciousBots.some(visitor => visitor.ip_address === testsConfig.ipAddressToLocate);

        expect(isIpFound).toBe(true)
    })

    test('If any of the malicious data centers in the list are found, pass the test', async () => {
        const data: TVisitor[] = await getData()
        const isMaliciousDcFound: boolean = data.some(visitor => testsConfig.maliciousDataCenters.includes(visitor.ip_address))

        expect(isMaliciousDcFound).toBe(true)
    })
})

async function getData(): Promise<TVisitor[]>  {
    return TestsHelper.beautifyExcelRawData(await readXlsxFile(path.join(__dirname, '..', 'data', 'data.xlsx')));
}


