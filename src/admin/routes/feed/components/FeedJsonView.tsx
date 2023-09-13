import { CodeBlock, Container, Heading } from '@medusajs/ui';
import { useAdminCustomQuery } from 'medusa-react';

import { FeedQuery, FeedResponseJson } from '../types/table';

const FeedJsonView: React.FC = () => {
  const { data, isLoading } = useAdminCustomQuery<FeedQuery, FeedResponseJson>(
    'feed/json', // path
    ['feed'], // queryKey
    {
      // any query parameters you want to send
    }
  );

  const feedItems = data?.rss?.channel[0]?.item || [];

  const snippets = [
    {
      label: 'Feed',
      language: 'json',
      code: JSON.stringify(feedItems, null, 2),
    },
  ];

  return (
    <Container className="flex-1">
      <div className="flex flex-col gap-3">
        <Heading level="h2">Product JSON Feed</Heading>
        {isLoading && <span>Loading...</span>}
        {feedItems.length > 0 && (
          <CodeBlock
            className="max-h-[300px] overflow-y-auto"
            snippets={snippets}
          >
            <CodeBlock.Header hideLabels={true}></CodeBlock.Header>
            <CodeBlock.Body />
          </CodeBlock>
        )}
      </div>
    </Container>
  );
};

export default FeedJsonView;
