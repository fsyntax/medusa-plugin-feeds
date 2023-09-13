import React from 'react';
import { RouteConfig } from '@medusajs/admin';

import FeedTable from './components/Table';
import FeedJsonView from './components/FeedJsonView';
import FeedXmlView from './components/FeedXmlView';

const FeedPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <FeedXmlView />
        <FeedJsonView />
      </div>
      <FeedTable />
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: 'Product Feed',
  },
};
export default FeedPage;
