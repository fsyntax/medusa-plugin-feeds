import { Router } from 'express';
import { getConfigFile } from 'medusa-core-utils';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import cors from 'cors';
import { handleFeed } from './libs/feeds';
import { attachFeedRoutes } from './feed';

const router: (rootDirectory: string, options: any) => Router = (
  rootDirectory,
  options
) => {
  const router = Router();
  const { configModule } = getConfigFile<ConfigModule>(
    rootDirectory,
    'medusa-config'
  );
  const { projectConfig } = configModule;

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(','),
    credentials: true,
  };

  const feedRouter = Router();

  router.use('/feed', feedRouter);

  attachFeedRoutes(feedRouter);

  router.options('/admin/feed/xml', cors(adminCorsOptions));
  router.options('/admin/feed/json', cors(adminCorsOptions));

  router.get(
    '/admin/feed/xml',
    cors(adminCorsOptions),
    async (req, res, next) => handleFeed(req, res, 'xml', true)
  );

  router.get(
    '/admin/feed/json',
    cors(adminCorsOptions),
    async (req, res, next) => handleFeed(req, res, 'json', true)
  );

  return router;
};

export default router;
