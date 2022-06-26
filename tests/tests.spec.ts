import {expect, test} from '@playwright/test';
import * as path from 'path'
import { testsConfig } from '../testsConfig'
import { TestsHelper } from "../classes/TestsHelper";
import readXlsxFile from "read-excel-file/node";
import { TVisitor } from "../models/model";
import { Row } from "read-excel-file";

// test.beforeEach(async ({ page }) => {
//     await createDefaultTodos(page);
// });

test.describe('Find Malicious Bots', () => {
    test.skip('When a specified IP address is found as an origin of a malicious bot, pass the test', async () => {
        const data: Row[] = await readXlsxFile(path.join(__dirname, '..', 'data', 'data.xlsx'))
        const maliciousBots: TVisitor[] = TestsHelper.locateAllMaliciousBots(TestsHelper.beautifyExcelRawData(data))
        const found = maliciousBots.some(visitor => visitor.ip_address === testsConfig.ipAddressToLocate);

        expect(found).toBe(true)
    })

    test('When any of the malicious data centers in the list are found, pass the test', async () => {
        const data: Row[] = await readXlsxFile(path.join(__dirname, '..', 'data', 'data.xlsx'))
        const dataBeautified: TVisitor[] = TestsHelper.beautifyExcelRawData(data)
        const isMaliciousDcFound = dataBeautified.some(visitor => {
            return testsConfig.maliciousDataCenters.includes(visitor.ip_address)
        })

        expect(isMaliciousDcFound).toBe(true)
    })
})



