import {VideoCreateInput} from "../src/models/videos/dto/video.input";
import {AvailableResolutions} from "../src/models/videos/types";
import {setupApp} from "../src/setup-app";
import express from "express";
import request from 'supertest'
import {HTTP_STATUS_CODES} from "../src/core/constants/http-status-codes";
import {Video} from "../src/models/videos/dto/video.output";

const videoCreate: VideoCreateInput = {
    title: 'new video',
    author: 'some author',
    availableResolutions: [AvailableResolutions.P144]
}
// jest.useFakeTimers({legacyFakeTimers:true})
describe('/videos', () => {
    const app = express();
    let createdVideo: Video | null = null;

    setupApp(app); // подключает все middleware, маршруты и необходимые настройки
    //
    const getAll = async () => await request(app).get("/videos")

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
        expect(resp.status).toBe(HTTP_STATUS_CODES.CREATED_201)
        expect(resp.body.title).toBe(videoCreate.title)
        expect(resp.body.title).toBe(videoCreate.title)
        createdVideo = resp.body;
        const all = await getAll()
        expect(all.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(all.body.length).toBe(1)
    })
    it('post with incorrect title', async () => {
        const resp = await request(app).post("/videos").send({...videoCreate, title: null})


        expect(resp.status).toBe(HTTP_STATUS_CODES.CLIENT_ERROR_400)
        expect(resp.body).toStrictEqual({
            errorsMessages: [{
                field: 'title',
                message: 'Incorrect value'
            }]
        })
    })


    it('should get video by id', async () => {
        const resp = await request(app).get(`/videos/${createdVideo?.id}`)
        expect(resp.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(resp.body).toStrictEqual(createdVideo)
    })

    it('should delete video by id', async () => {
        await request(app).delete(`/videos/${createdVideo?.id}`).expect(HTTP_STATUS_CODES.NO_CONTENT_204)
    })

    it("shouldn't get video by id after deleting", async () => {
        await request(app).get(`/videos/${createdVideo?.id}`).expect(HTTP_STATUS_CODES.NOT_FOUND_404)
    })
})