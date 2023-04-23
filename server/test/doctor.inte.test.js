const request = require("supertest")
const app = require("../server")
const endPoint1 = "/fever/addMedi"
const endPoint2 = "/fever/updateMedi/1"
const endPoint3 = "/user/login"
const endPoint4 = "/user/verify"
const newMedi = require("../JSON/newMedi.json")
const editMedi = require("../JSON/editMedi.json")
const user = require("../JSON/user.json")
const axios = require("axios")
let token = ""
describe("it should return a new medicine", () => {
    it("POST" + endPoint1, async () => {
        const response = await request(app).post(endPoint1).send(newMedi)
        expect(response.statusCode).toBe(200)
        expect(response.body.rows[0].name).toBe(newMedi.name)
    })
    it("PUT" + endPoint2, async () => {
        const response = await request(app).put(endPoint2).send(editMedi)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe("Medi is updated")
    })

    it("POST" + endPoint3, async () => {
        const response = await request(app).post(endPoint3).send(user)
        expect(response.statusCode).toBe(200)
        token = response.body
        expect(typeof response.body).toBe("string")
    })
    it("GET AUTHENTICATION" + endPoint4, async () => {
        const response = await request(app).get(endPoint4).set('token', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
    })
})