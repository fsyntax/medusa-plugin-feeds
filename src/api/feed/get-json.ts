import { Request, Response } from 'express';
import { handleFeed } from '../libs/feeds';

export default async (req: Request, res: Response): Promise<void> => {
  handleFeed(req, res, 'json');
};
