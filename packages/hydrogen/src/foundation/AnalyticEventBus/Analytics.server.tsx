import React from 'react';
import {useServerDatalayer} from './hook';
import {Analytics as AnalyticsClient} from './Analytics.client';
import {useServerRequest} from '../ServerRequestProvider';

export function Analytics() {
  const cache = useServerRequest().ctx.cache;

  // Make sure all queries have returned before rendering the Analytics server component
  cache.forEach((cacheFn) => {
    const result = cacheFn.call();
    if (result instanceof Promise) throw result;
  });

  const analyticData = useServerDatalayer();
  return <AnalyticsClient analyticDataFromServer={analyticData} />;
}