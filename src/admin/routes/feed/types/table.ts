type FeedQuery = {};

type FeedResponseJson = {
  rss: {
    channel: {
      item: any;
    };
  };
};

type FeedResponse = {
  xml: string;
};

export { FeedQuery, FeedResponseJson, FeedResponse };
