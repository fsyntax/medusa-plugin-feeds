import { Router } from "express";

export default (rootDirectory, options) => {
    const router = Router();
    router.get("/feed", async (req, res) => {
        try {
            const feedService = req.scope.resolve("feedService");

            if (!feedService) {
                return res.status(500).send("Feed Service not resolved.");
            }

            const xml = await feedService.createFeed();

            res.set('Content-Type', 'text/xml');
            res.send(xml);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while generating the feed.");
            return;
        }
    });

    return router;
};
