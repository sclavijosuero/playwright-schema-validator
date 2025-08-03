import { expect } from '@playwright/test';
import { pwApi, test } from 'pw-api-plugin';

import { validateSchemaZod } from '../src/index';

import petstoreSchema from '../tests-data/schemas/zod-schema-petstore.js';

const issuesStyles = {
    iconPropertyError: '🟦',
    colorPropertyError: '#5178eb',
    iconPropertyMissing: '🟪',
    colorPropertyMissing: '#800080'
}

test.describe('Suite Zod Schema Petstore', async () => {

    const baseUrl = 'https://petstore.swagger.io/v2';

    test('should validate the OpenAPI schema for GET findByStatus "pending"', async ({ request, page }) => {
        const findByStatusReq = await request.get(
            `${baseUrl}/pet/findByStatus?status=pending`,
            { headers: { 'Content-Type': 'application/json' }}
        );

        const responseFindByStatus = await findByStatusReq.json();
        expect(findByStatusReq.status()).toBe(200);
        await validateSchemaZod({ page }, responseFindByStatus, petstoreSchema);
        
    });

    test('should validate the OpenAPI schema for GET findByStatus "available" Custom Issues Style', async ({ request, page }) => {
        const findByStatusReq = await request.get(
            `${baseUrl}/pet/findByStatus?status=available`,
            { headers: { 'Content-Type': 'application/json' }}
        );

        const responseFindByStatus = await findByStatusReq.json();
        expect(findByStatusReq.status()).toBe(200);
        await validateSchemaZod({ page }, responseFindByStatus, petstoreSchema, issuesStyles);
    });


})