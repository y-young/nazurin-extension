import React from 'react';
import { openInNewTab } from '../../utils';
import StatusIcon from './StatusIcon';

type Props = { item: ProcessedItem };

const HistoryItem: React.FC<Props> = ({ item }) => {
  const date = new Date(item.timestamp);

  return (
    <article className="py-2">
      <div className="flex">
        <div
          className="flex-grow whitespace-nowrap overflow-hidden text-ellipsis"
          title={item.title}
        >
          {item.title}
        </div>
        <span className="px-1">
          <StatusIcon status={item.status} />
        </span>
      </div>
      <div className="flex">
        <a
          onClick={() => openInNewTab(item.url)}
          href={item.url}
          className="text-slate-500 flex-grow overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
        >
          {item.url}
        </a>
        <time
          className="text-gray-400 flex-1 whitespace-nowrap text-right ml-1"
          dateTime={date.toISOString()}
          title={date.toLocaleString()}
        >
          {date.toLocaleTimeString()}
        </time>
      </div>
      {item.error && <div className="text-rose-500">{item.error}</div>}
    </article>
  );
};

export default HistoryItem;
