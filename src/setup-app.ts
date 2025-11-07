import express, {Express} from "express";
import {videosRouter} from "./models/videos/routes";
import {DB} from "./db/db";
import {HTTP_STATUS_CODES} from "./core/constants/http-status-codes";
export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.use('/videos', videosRouter);

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.delete("/testing/all-data", (req, res) => {
        DB.videos = []
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204)
    });

    return app;
};