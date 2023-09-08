import { Router, Request, Response } from "express";
import xml2js from 'xml2js';
import { getConfigFile } from "medusa-core-utils"
import { ConfigModule } from "@medusajs/medusa/dist/types/global"
import cors from "cors"

const router: (rootDirectory: string, options: any) => Router = (rootDirectory, options) => {
    const router = Router();
    const { configModule } = getConfigFile<ConfigModule>(rootDirectory, "medusa-config")
    const { projectConfig } = configModule

    const adminCorsOptions = {
        origin: projectConfig.admin_cors.split(","),
        credentials: true,
    }

    const handleFeed = async (req: Request, res: Response, format: 'xml' | 'json', isAdmin: boolean = false) => {
        try {
            const feedService = req.scope.resolve("feedService");

            if (!feedService) {
                return res.status(500).send("Feed Service not resolved.");
            }

            const xml = await feedService.createFeed();

            if (format === 'xml') {
                res.set('Content-Type', 'text/xml');
                res.send(xml);
            } else {
                xml2js.parseString(xml, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error converting XML to JSON.");
                    }
                    res.json(result);
                });
            }

            return;
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while generating the feed.");
            return;
        }
    };

    router.get("/feed/xml", async (req, res, next) => handleFeed(req, res, 'xml'));
    router.get("/feed/json", async (req, res, next) => handleFeed(req, res, 'json'));

    router.options("/admin/feed/xml", cors(adminCorsOptions))
    router.get("/admin/feed/xml",  cors(adminCorsOptions), async (req, res, next) => handleFeed(req, res, 'xml', true));

    router.options("/admin/feed/json", cors(adminCorsOptions))
    router.get("/admin/feed/json",  cors(adminCorsOptions), async (req, res, next) => handleFeed(req, res, 'json', true));

    return router;
};

export default router;
