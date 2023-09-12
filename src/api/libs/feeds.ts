import { Request, Response } from 'express';
import xml2js from 'xml2js';

const handleFeed = async (
  req: Request,
  res: Response,
  format: 'xml' | 'json',
  isAdmin: boolean = false
) => {
  try {
    const feedService = req.scope.resolve('feedService');

    if (!feedService) {
      return res.status(500).send('Feed Service not resolved.');
    }

    const xml = await feedService.createFeed();

    if (format === 'xml') {
      res.set('Content-Type', 'text/xml');
      res.send(xml);
    } else {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error converting XML to JSON.');
        }
        res.json(result);
      });
    }

    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating the feed.');
    return;
  }
};

export { handleFeed };
