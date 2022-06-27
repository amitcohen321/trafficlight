"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const path = __importStar(require("path"));
const testsConfig_1 = require("../testsConfig");
const TestsHelper_1 = require("../classes/TestsHelper");
const node_1 = __importDefault(require("read-excel-file/node"));
test_1.test.describe('Find Malicious Bots', () => {
    (0, test_1.test)('If a specified IP address is found as an origin of a malicious bot, pass the test', async () => {
        const data = await getData();
        const maliciousBots = TestsHelper_1.TestsHelper.locateAllMaliciousBots(data);
        const isIpFound = maliciousBots.some(visitor => visitor.ip_address === testsConfig_1.testsConfig.ipAddressToLocate);
        (0, test_1.expect)(isIpFound).toBe(true);
    });
    (0, test_1.test)('If any of the malicious data centers in the list are found, pass the test', async () => {
        const data = await getData();
        const isMaliciousDcFound = data.some(visitor => testsConfig_1.testsConfig.maliciousDataCenters.includes(visitor.ip_address));
        (0, test_1.expect)(isMaliciousDcFound).toBe(true);
    });
});
async function getData() {
    return TestsHelper_1.TestsHelper.beautifyExcelRawData(await (0, node_1.default)(path.join(__dirname, '..', 'data', 'data.xlsx')));
}
//# sourceMappingURL=tests.spec.js.map