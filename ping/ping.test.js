'use strict';

const request = require('supertest');

const app = require("../server");

const server = request.agent(`http://localhost:8080`);

describe("PING GET route", () => {

    it('ping route for helth check', (done) => {
        server
            .get('/v1/ping')
            .set('Accept', 'application/json')
            .expect(200, done);
    })
})