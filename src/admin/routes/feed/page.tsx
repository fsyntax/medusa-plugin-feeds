import React from 'react';
import { RouteConfig } from "@medusajs/admin";
import { MedusaProvider, useAdminCustomQuery  } from 'medusa-react';
import {Container, Heading } from '@medusajs/ui'
import { QueryClient } from '@tanstack/react-query';
import XMLViewer from 'react-xml-viewer';

const queryClient = new QueryClient();

type FeedQuery = {
};

type FeedResponse = {
    xml: string;
};

const FeedPage: React.FC = () => {
    const { data, isLoading } = useAdminCustomQuery<FeedQuery, FeedResponse>(
        'feed/xml',
        ['feed'],
        {}
    );

    console.log("Data type: ", typeof data);
    console.log("Data content: ", data);

    let feedXML = data?.xml;

    // TODO: Hack
    if (typeof data === 'object' && !feedXML) {
        feedXML = Object.values(data).join('');
    }

    return (
        <MedusaProvider
            queryClientProviderProps={{ client: queryClient }}
            baseUrl="http://localhost:9000"
        >
            <Container>
               <div className="flex flex-col gap-3">
                   <Heading level="h2" >Product XML Feed</Heading>
                   {isLoading && <span>Loading...</span>}
                   {feedXML && (
                       <XMLViewer xml={feedXML} collapsible={true} initalCollapsedDepth={1} />
                   )}
               </div>
            </Container>
        </MedusaProvider>
    );
};

export const config: RouteConfig = {
    link: {
        label: "Product Feed",
    },
};
export default FeedPage;
