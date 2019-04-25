'use strict';

/** 
 * We are using assertion library that is expect.js for checking values in tests
 * for more deatils and common assertions functions go through https://github.com/mjackson/expect
 * 
*/

require('dotenv').config({ "path": '../secured/.env' });

const request = require('supertest');

const app = require("../server");


describe("PING GET route", () => {

    it('ping route for helth check', (done) => {
        request(app)
            .get('/v1/ping')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    })
})