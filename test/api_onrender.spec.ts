import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Company', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api-desafio-qa.onrender.com';

    p.request.setDefaultTimeout(30000);

    beforeAll(() => p.reporter.add(rep));
    afterAll(() => p.reporter.end());
    // Api company post
    let companyId;
    it('Nova empresa', async () => {
        const response = await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company 8",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.CREATED)
            .toss();

        companyId = response.body.id; // assuming the id is in the response body
    });
    it('Nova empresa - CNPJ inválido', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "1231231231231",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Nova empresa - Nome em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            });
    });
    it('Nova empresa - CNPJ em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            });
    });
    it('Nova empresa - Estado em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "12312312312312",
                "state": "",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            });
    });
    it('Nova empresa - Cidade em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            });
    });
    it('Nova empresa - Endereço em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "",
                "sector": "Tecnologia",
            });
    });
    it('Nova empresa - Setor em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company`)
            .withJson({
                "name": "Miguelis Company",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "",
            });
    });
    // Api company get
    it('Listar empresas', async () => {
        await p
            .spec()
            .get(`${baseUrl}/company`)
            .expectStatus(StatusCodes.OK)
            .toss();
    });
    // Api company get by id
    it('Listar empresa por ID', async () => {
        await p
            .spec()
            .get(`${baseUrl}/company/${companyId}`)
            .expectStatus(StatusCodes.OK)
            .toss();
    });
    it('Listar empresa por ID - ID inválido', async () => {
        await p
            .spec()
            .get(`${baseUrl}/company/0`)
            .expectStatus(StatusCodes.NOT_FOUND)
            .toss();
    });
    // Api company put
    it('Atualizar empresa', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.OK)
            .toss();
    });
    it('Atualizar empresa - Nome em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            });
    });
    it('Atualizar empresa - CNPJ em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    it('Atualizar empresa - Estado em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    it('Atualizar empresa - Cidade em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    it('Atualizar empresa - Endereço em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    it('Atualizar empresa - Setor em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    it('Atualizar empresa - ID inválido', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/0`)
            .withJson({
                "name": "Miguelis testes",
                "cnpj": "12312312312312",
                "state": "SP",
                "city": "São Paulo",
                "address": "Rua dos Bobos, nº 0",
                "sector": "Tecnologia",
            })
            .expectStatus(StatusCodes.NOT_FOUND)
            .toss();
    });

    // Api company POST products
    let productId;
    it('Novo produto', async () => {
        const response = await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/products`)
            .withJson({
                "productName": "Mouse",
                "productDescription": "Mouse sem fio",
                "price": 50.00,
            })
            .expectStatus(StatusCodes.CREATED)
            .toss();
        productId = response.body.id; // assuming the id is in the response body
    });
    it('Novo produto - Nome em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/products`)
            .withJson({
                "productName": "",
                "productDescription": "Mouse sem fio",
                "price": 50.00,
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Novo produto - Descrição em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/products`)
            .withJson({
                "productName": "Mouse",
                "productDescription": "",
                "price": 50.00,
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Novo produto - Preço em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/products`)
            .withJson({
                "productName": "Mouse",
                "productDescription": "Mouse sem fio",
                "price": "",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    // Api company GET products
    it('Listar produtos', async () => {
        await p
            .spec()
            .get(`${baseUrl}/company/${companyId}/products`)
            .expectStatus(StatusCodes.OK)
            .toss();
    });
    // Api company POST employees
    let employeeId;
    it('Novo funcionário', async () => {
        const response = await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/employees`)
            .withJson({
                "name": "Miguelis",
                "position": "QA",
                "email": "errado@mamail.com"
            })
            .expectStatus(StatusCodes.CREATED)
            .toss();
        employeeId = response.body.id; // assuming the id is in the response body
    });
    it('Novo funcionário - Nome em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/employees`)
            .withJson({
                "name": "",
                "position": "QA",
                "email": "teste@mamail.com"
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Novo funcionário - Cargo em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/employees`)
            .withJson({
                "name": "Miguelis",
                "position": "",
                "email": "toto@gmail.lalaus"
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Novo funcionário - Email em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/employees`)
            .withJson({
                "name": "Miguelis",
                "position": "QA",
                "email": ""
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    
    // Api company PUT employees
    it('Atualizar funcionário', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
            .withJson({
                "name": "Miguelis",
                "position": "QA",
                "email": "testes@lalaus.codes"
            })
            .expectStatus(StatusCodes.OK)
            .toss();
    });
    it('Atualizar funcionário - Nome em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
            .withJson({
                "name": "",
                "position": "QA",
                "email": "testes@lula.13"
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Atualizar funcionário - Cargo em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
            .withJson({
                "name": "Miguelis",
                "position": "",
                "email": "testes@lula.13"
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Atualizar funcionário - Email em branco', async () => {
        await p
            .spec()
            .put(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
            .withJson({
                "name": "Miguelis",
                "position": "QA",
                "email": ""
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });

    // Api company POST services
    let serviceId;
    it('Novo serviço', async () => {
        const response = await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/services`)
            .withJson({
                "serviceName": "Entrega",
                "serviceDescription": "Entrega de produtos",
            })
            .expectStatus(StatusCodes.CREATED)
            .toss();
        serviceId = response.body.id; // assuming the id is in the response body
    });
    it('Novo serviço - Nome em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/services`)
            .withJson({
                "serviceName": "",
                "serviceDescription": "Entrega de produtos",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    it('Novo serviço - Descrição em branco', async () => {
        await p
            .spec()
            .post(`${baseUrl}/company/${companyId}/services`)
            .withJson({
                "serviceName": "Entrega",
                "serviceDescription": "",
            })
            .expectStatus(StatusCodes.BAD_REQUEST)
            .toss();
    });
    // Api company GET services
    it('Listar serviços', async () => {
        await p
            .spec()
            .get(`${baseUrl}/company/${companyId}/services`)
            .expectStatus(StatusCodes.OK)
            .toss();
    });

});    