import React from 'react';
import { RouteConfig } from "@medusajs/admin";
import { MedusaProvider, useAdminCustomQuery  } from 'medusa-react';
import {Container, Heading, Table, CodeBlock } from '@medusajs/ui'
import { QueryClient } from '@tanstack/react-query';
import XMLViewer from 'react-xml-viewer';

const queryClient = new QueryClient();

type FeedQuery = {
};

type FeedResponse = {
    xml: string;
};
type FeedResponseJson = {
    rss: {
        channel: {
            item: any
        }
    }
};

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
                <Heading level="h2" >Product XML Feed</Heading>
                    {isLoading && <span>Loading...</span>}
                    {feedXML && (
                        <div className="max-h-[300px] overflow-y-auto">
                            <XMLViewer xml={feedXML} collapsible={true} initalCollapsedDepth={1} />
                        </div>
                    )}
            </div>
        </Container>
    );
}

const FeedJsonView: React.FC = () => {
    const { data, isLoading } = useAdminCustomQuery<FeedQuery, FeedResponseJson>(
        "feed/json", // path
        ["feed"], // queryKey
        {
            // any query parameters you want to send
        }
    );

    const feedItems = data?.rss?.channel[0]?.item || [];

    const snippets = [
        {
            label: "Feed",
            language: "json",
            code: JSON.stringify(feedItems, null, 2),
        },
    ];

    return (
        <Container className="flex-1">
            <div className="flex flex-col gap-3">
                <Heading level="h2">Product JSON Feed</Heading>
                {isLoading && <span>Loading...</span>}
                {feedItems.length > 0 && (
                    <CodeBlock className="max-h-[300px] overflow-y-auto" snippets={snippets}>
                        <CodeBlock.Header hideLabels={true}>
                        </CodeBlock.Header>
                         <CodeBlock.Body />
                    </CodeBlock>
                )}
            </div>
        </Container>
    );
};

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

const FeedPage: React.FC = () => {
    return (
        <MedusaProvider
            queryClientProviderProps={{ client: queryClient }}
            baseUrl="http://localhost:9000"
        >
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <FeedXmlView />
                    <FeedJsonView />
                </div>
                <FeedTable />
            </div>
        </MedusaProvider>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Product Feed",
    },
};
export default FeedPage;
