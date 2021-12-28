import * as express from 'express'
import supertest from 'supertest'
import request from 'supertest'
import MockMiddleware from '../middleware'
import app from '../server'
jest.mock('../middleware',()=> jest.fn((req:express.Request,res:express.Response, next:Function)=>next()))

let server

describe("API End Point Test", ()=>{
    beforeEach(()=>{
        server = app.listen(4000)
    })
    describe("Location Controller Test", ()=>{
        describe("Count Restaurants by Location Id", ()=>{

            beforeEach(()=>{
            })
            it("Count Restaurants by Location Id - Success", (done) => {
                request(server).get('/api/locations/1/count')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{
                    })
                    done()
            })
        })
        describe("Get Locations List", ()=>{
            it("Get Locations List - Success", (done) => {
                request(server).get('/api/locations')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        describe("Get Location By Id", ()=>{
            it("Get Location By Id - Success", (done) => {
                request(server).get('/api/locations/1')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        afterEach(()=>{
            server.close()
        })
    })

    describe("Restaurants Controller Test", ()=>{
        
        describe("Get Restaurants By Location Id", ()=>{
            it("Get Restaurants By Location Id - Success", (done) => {
                request(server).get('/api/locations/1/restaurants')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        describe("Get Restaurants List", ()=>{
            it("Get Restaurants List - Success", (done) => {
                request(server).get('/api/restaurants')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        describe("Get Restaurant By Id", ()=>{
            it("Get Restaurant By Id - Success", (done) => {
                request(server).get('/api/restaurants/1')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        describe("Draw Restaurants", ()=>{
            it("Draw Restaurants By Id - Success", (done) => {
                request(server).post('/api/restaurants/draw')
                    .send({locationId: 1, rangeIds: [1,2]})
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })
    })

    describe("Tag Controller Test", ()=>{
        describe("Count Restaurants by Tag Id", ()=>{
            it("Count Restaurants by Tag Id - Success", (done) => {
                request(server).get('/api/tags/1/count')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })
        describe("Get Tags List", ()=>{
            it("Get Tags List - Success", (done) => {
                request(server).get('/api/tags')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })

        describe("Get Tag By Id", ()=>{
            it("Get Tag By Id - Success", (done) => {
                request(server).get('/api/tags/1')
                    .expect(200)
                    .expect("Content-Type", /json/)
                    .expect((res)=>{

                    })
                    done()
            })
        })
    })
    afterEach(()=>{
        server.close()
    })
})