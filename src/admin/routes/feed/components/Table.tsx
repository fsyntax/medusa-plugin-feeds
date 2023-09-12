import { Container, Heading, Table } from '@medusajs/ui';
import { useAdminCustomQuery } from 'medusa-react';
import { FeedQuery, FeedResponseJson } from '../types/table';

const FeedTable: React.FC = () => {
  const { data, isLoading } = useAdminCustomQuery<FeedQuery, FeedResponseJson>(
    'feed/json',
    ['feed'],
    {}
  );

  const items = data?.rss?.channel[0]?.item || [];

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <Heading level="h2">Feed Table</Heading>
        {isLoading && <span>Loading...</span>}
        {items.length > 0 && (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Item Group ID</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Link</Table.HeaderCell>
                <Table.HeaderCell>Image Link</Table.HeaderCell>
                <Table.HeaderCell>Availability</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item['g:id']?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item['g:item_group_id']?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item.title?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item.link?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item['g:image_link']?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item['g:availability']?.[0] ?? ''}</Table.Cell>
                  <Table.Cell>{item['g:condition']?.[0] ?? ''}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default FeedTable;
