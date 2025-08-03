## USAGE EXAMPLES FOR AJV SCHEMA VALIDATOR

> Note: The functions `validateSchema()` and `validateSchemaAjv()` are aliases.

&nbsp; 

### Example: `validateSchema()` using **Playwright standard API requests**.

```javascript
    test('Should validate schema of POST "/store/order" endpoint - PASS', async ({ request, page }) => {

        const requestBody1 = {
            "id": 0,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2024-01-01T00:57:29.231Z",
            "status": "placed",
            "complete": false
        }

        const responsePost1 = await request.post(`https://petstore.swagger.io/v2)/store/order`,
            {
                data: requestBody1,
                headers: { 'Content-type': 'application/json; charset=UTF-8'},
            }
        );

        expect(responsePost1.status()).toBe(200)
        const responseBodyPost1 = await responsePost1.json()
        await validateSchema(
            { page },
            responseBodyPost1,
            petStoreSwaggerErrors,
            { endpoint: '/store/order', method: 'post', status: 200 }
        );
    });
```


### Example: `validateSchemaAjv()` using **Playwright standard API requests** and overriding `issuesStyles`.

```javascript
    test('Should validate schema of POST "/store/order" endpoint - PASS', async ({ request, page }) => {

        const issuesStyles = {
            iconPropertyError: '🟦',
            colorPropertyError: '#5178eb',
            iconPropertyMissing: '🟪',
            colorPropertyMissing: '#800080'
        }

        const requestBody2 = {
            "id": 0,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2024-01-01T00:57:29.231Z",
            "status": "placed",
            "complete": false
        }

        const responsePost2 = await request.post(`https://petstore.swagger.io/v2)/store/order`,
            {
                data: requestBody2,
                headers: { 'Content-type': 'application/json; charset=UTF-8'},
            }
        );

        expect(responsePost2.status()).toBe(200)
        const responseBodyPost2 = await responsePost2.json()
        await validateSchemaAjv(
            { page },
            responseBodyPost2,
            petStoreSwaggerErrors,
            { endpoint: '/store/order', method: 'post', status: 200 },
            issuesStyles
        );
    });
```


### Example: `validateSchema()` using **`pw-api-plugin`** with `pwApi` class.

```javascript
    test('Should validate schema of POST "/store/order" endpoint - PASS', async ({ request, page }) => {

        const requestBody = {
            "id": 0,
            "petId": 0,
            "quantity": 0,
            "shipDate": "2024-01-01T00:57:29.231Z",
            "status": "placed",
            "complete": false
        }

        const responsePost = await pwApi.post({ request, page }, `https://petstore.swagger.io/v2)/store/order`,
            {
                data: requestBody,
                headers: { 'Content-type': 'application/json; charset=UTF-8'},
            }
        );

        expect(responsePost.status()).toBe(200)
        const responseBodyPost = await responsePost.json()
        await validateSchema(
            { page },
            responseBodyPost,
            petStoreSwaggerErrors,
            { endpoint: '/store/order', method: 'post', status: 200 }
        );
    });
```


### Example: `validateSchemaAjv()` using **`pw-api-plugin`** with `axiosApi` class and overriding `issuesStyles`.

```javascript
    test('Should validate schema of POST "/store/order" endpoint ', async ({ request, page }) => {

        const issuesStyles = {
            iconPropertyError: '🟦',
            colorPropertyError: '#5178eb',
            iconPropertyMissing: '🟪',
            colorPropertyMissing: '#800080'
        }

        const responseGet = await axiosApi.get( { page }, `https://petstore.swagger.io/v2/pet/findByStatus?status=pending`,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        expect(responseGet.status).toBe(200)
        const responseBodyGet = await responseGet.data
        await validateSchemaAjv(
            { page },
            responseBodyGet,
            petStoreSwaggerErrors,
            { endpoint: '/pet/findByStatus', method: 'get', status: 200 },
            issuesStyles
        );
    })
```
