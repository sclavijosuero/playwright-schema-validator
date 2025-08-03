import { expect, test } from '@playwright/test';

import { validateSchemaZod } from '../src/index';

import schema from '../tests-data/schemas/zod-schema-simple.js';

import mockDataPass from '../tests-data/mock-data-zod/sample-pass.json';
import mockDataFail from '../tests-data/mock-data-zod/sample-fail.json';

// This test suite validates a Zod schema against sample data using Playwright.
// It includes tests for both passing and failing scenarios, with optional custom error styles.

test.describe('Suite Zod Schema', async () => {

    test('Test Zod Schema - Schema Simple - Pass', async ({ page }) => {
        await validateSchemaZod({ page }, mockDataPass, schema);
        expect(mockDataPass.length).toBe(3)
    });

    test('Test Zod Schema - Schema Simple - Fail default Style', async ({ page }) => {
        await validateSchemaZod({ page }, mockDataFail, schema);
        expect(mockDataFail.length).toBe(3)
    });

    test('Test Zod Schema - Schema Simple - Fail custom Style', async ({ page }) => {
        const customStyleErrors = { iconPropertyError: '⛔', iconPropertyMissing: '❓' }
        await validateSchemaZod({ page }, mockDataFail, schema, customStyleErrors);
        expect(mockDataFail.length).toBe(3)
    });

});