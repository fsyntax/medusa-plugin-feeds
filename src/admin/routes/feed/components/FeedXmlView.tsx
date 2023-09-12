import { useAdminCustomQuery } from 'medusa-react';
import { FeedQuery, FeedResponse } from '../types/table';
import { Container, Heading } from '@medusajs/ui';
import XMLViewer from 'react-xml-viewer';

const FeedXmlView: React.FC = () => {
  const { data, isLoading } = useAdminCustomQuery<FeedQuery, FeedResponse>(
    'feed/xml',
    ['feed'],
    {}
  );

  let feedXML = data?.xml;

  // TODO: Hack
  if (typeof data === 'object' && !feedXML) {
    feedXML = Object.values(data).join('');
  }
  return (
    <Container className="flex-1">
      <div className="flex flex-col gap-3">
        <Heading level="h2">Product XML Feed</Heading>
        {isLoading && <span>Loading...</span>}
        {feedXML && (
          <div className="max-h-[300px] overflow-y-auto">
            <XMLViewer
              xml={feedXML}
              collapsible={true}
              initalCollapsedDepth={1}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default FeedXmlView;
