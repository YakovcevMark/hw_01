import {VideoCreateInput} from "../src/models/videos/dto/video.input";
import {AvailableResolutions} from "../src/models/videos/types";
import {setupApp} from "../src/setup-app";
import express from "express";
import request from 'supertest'
import {HTTP_STATUS_CODES} from "../src/core/constants/http-status-codes";

const videoCreate: VideoCreateInput = {
    title: 'new video',
    author: 'some author',
    availableResolutions: [AvailableResolutions.P144]
}

// jest.useFakeTimers({legacyFakeTimers:true})
describe('/videos', () => {
    const app = express();
    setupApp(app); // подключает все middleware, маршруты и необходимые настройки
    //
    const getAll =  async () => await request(app).get("/videos")

    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(HTTP_STATUS_CODES.NO_CONTENT_204)
    });

    it('getAll', async () => {
        const resp = await getAll()
        expect(resp.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(resp.body).toStrictEqual([])
    })

    it('post', async () => {
        const resp = await request(app).post("/videos").send(videoCreate)
        expect(resp.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(resp.body.title).toBe(videoCreate.title)
        expect(resp.body.title).toBe(videoCreate.title)

        const all = await getAll()
        expect(all.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(all.body.length).toBe(1)
    })
    it('post with incorrect title', async () => {
        const resp = await request(app).post("/videos").send({...videoCreate, title:null})


        expect(resp.status).toBe(HTTP_STATUS_CODES.CLIENT_ERROR_400)
        expect(resp.body).toStrictEqual({errorMessages:[{
                field:'title',
                message:'Incorrect value'
            }]})
    })

})