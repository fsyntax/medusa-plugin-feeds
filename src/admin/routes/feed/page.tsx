import React from 'react';
import { RouteConfig } from '@medusajs/admin';
import { MedusaProvider } from 'medusa-react';
import { QueryClient } from '@tanstack/react-query';

import FeedTable from './components/Table';
import FeedJsonView from './components/FeedJsonView';
import FeedXmlView from './components/FeedXmlView';

const queryClient = new QueryClient();

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
    label: 'Product Feed',
  },
};
export default FeedPage;
