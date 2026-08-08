const request = require('supertest');
const { expect } = require('chai');

describe (' Mutation - Login', () => {
    it('deve realizar login com sucesso quando informa credenciais válidas', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation Login($email: String!, $senha: String!) {
                login(email: $email, senha: $senha) {
                    token
                }
            }`,
                variables: {
                    email: "teteu@teste.com.br",
                    senha: "mmm123"
                }
            })
        expect(resposta.status).to.equal(200);
        expect(resposta.body.data.login).to.have.property('token');
    })
    it('não deve realizar login quando informo credenciais inválidas', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation Login($email: String!, $senha: String!) {
                    login(email: $email, senha: $senha) {
                        token
                    }
                }`,
                variables: {
                    email: "teteu@teste.com.br",
                    senha: "mmm1234"
                }
            })
        expect(resposta.status).to.equal(200)
        expect(resposta.body.errors[0]).to.have.property('message', 'Credenciais inválidas ou usuário inativo.')
    })
});