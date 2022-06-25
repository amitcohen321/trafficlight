import { test, expect, type Page } from '@playwright/test';
import * as path from 'path'
import { testsConfig } from '../testsConfig'
import { Row } from "read-excel-file";
import {TestsHelper} from "../classes/TestsHelper";
import {Cell} from "read-excel-file/types";
const xlsxFile = require('read-excel-file/node')

test.beforeEach(async ({ page }) => {
    console.log('this runs before each test')
});

test.describe('Find Malicious Bots', () => {

    test('When a specified IP address is found as an origin of a malicious bot, pass the test', () => {
        const dataPath: string = path.join(__dirname, '..', 'data', 'data.xlsx')
        const ipAddress: string = testsConfig.ipAddressToLocate

        xlsxFile(dataPath).then((rows: Row[]) => {
            const visitorsArr = TestsHelper.beautifyExcelRawData(rows)
            const maliciousBots = TestsHelper.locateMaliciousBots(visitorsArr)

            console.log(maliciousBots)
        })
    })





    test('Second Test', () => {
        console.log('hello world2')
    })
})



