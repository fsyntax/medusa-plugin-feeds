import { Router } from 'express';
import { wrapHandler } from '@medusajs/medusa';

import getPublicXml from './get-xml';
import getPublicJson from './get-json';

const attachFeedRoutes = (feedRouter: Router) => {
  feedRouter.get('/xml', wrapHandler(getPublicXml));
  feedRouter.get('/json', wrapHandler(getPublicJson));
};

export { attachFeedRoutes };
