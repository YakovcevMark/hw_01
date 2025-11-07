import {Router} from "express";
import {HTTP_STATUS_CODES} from "../../core/constants/http-status-codes";
import {DB} from "../../db/db";
import {Request, Response} from 'express'
import {RequestEntityId} from "../../core/types";
import {VideoCreateInput, VideoUpdateInput} from "./dto/video.input";
import {validateVideoCreation} from "./validation/video.create.validation";
import {createErrorResponse} from "../../core/utils/create-error-response";
import {Video} from "./dto/video.output";
import {validateVideoUpdating} from "./validation/video.update.validation";

const videosRouter = Router();

videosRouter

    .get("/", (req, res) => {
        console.log(DB.videos)
        res.status(HTTP_STATUS_CODES.OK_200).send(DB.videos);
    })

    .get("/:id", (req: Request<RequestEntityId>, res) => {
        const video = DB.videos.find(video => video.id === +req.params.id);
        if (!video) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
            return;
        }
        res.status(HTTP_STATUS_CODES.OK_200).send(video);
    })

    .post("/", (req: Request<{}, VideoCreateInput>, res:Response) => {
        const errors = validateVideoCreation(req.body);

        if (errors.length) {
            res.status(HTTP_STATUS_CODES.CLIENT_ERROR_400).send(createErrorResponse(errors))
            return;
        }

        const todayDate = new Date()
        const tomorrowDate = new Date(new Date().setDate(todayDate.getDate() + 1))

        const newVideo: Video = {
            id: DB.videos.length ? DB.videos[DB.videos.length - 1].id + 1 : 1,
            author: req.body.author,
            title: req.body.title,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: false,
            createdAt: todayDate.toISOString(),
            publicationDate: tomorrowDate.toISOString(),
            minAgeRestriction: null
        }
        DB.videos.push(newVideo)
        res.status(HTTP_STATUS_CODES.CREATED_201).send(newVideo)
    })

    .put("/:id", (req: Request<RequestEntityId, VideoUpdateInput>, res:Response) => {
        const errors = validateVideoUpdating(req.body);

        if (errors.length) {
            res.status(HTTP_STATUS_CODES.CLIENT_ERROR_400).send(createErrorResponse(errors))
            return;
        }

        const videoIndex = DB.videos.findIndex(video => video.id === +req.params.id);

        if (videoIndex === -1) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
            return;
        }

        DB.videos[videoIndex] = {
            ...DB.videos[videoIndex],
            ...req.body
        };


        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204)

    })

    .delete("/:id", (req: Request<RequestEntityId>, res) => {
        const video = DB.videos.find(video => video.id === +req.params.id);

        if (!video) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404);
            return;
        }
        DB.videos.filter(video => video.id !== +req.params.id)
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204);
    })

export {videosRouter}