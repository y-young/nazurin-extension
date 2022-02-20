import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import HistoryItem from './HistoryItem';

const History: React.FC = () => {
  const [history, setHistory] = useState<CollectionHistory>([]);

  useEffect(() => {
    chrome.storage.local.get('history', ({ history }) =>
      setHistory(history ?? [])
    );
    chrome.storage.onChanged.addListener((changes) => {
      setHistory(changes.history.newValue);
    });
  }, []);

  const clearHistory = () => {
    chrome.storage.local.set({ history: [] });
    setHistory([]);
  };

  return (
    <>
      <header className="flex flex-row mb-1">
        <h3 className="font-bold text-xl grow">
          {chrome.i18n.getMessage('historyTitle')}
        </h3>
        <button
          className="px-1"
          onClick={clearHistory}
          title={chrome.i18n.getMessage('historyClear')}
        >
          <FaTrashAlt className="text-rose-500" size="15" />
        </button>
      </header>
      <ul className="overflow-auto divide-y">
        {history.map(([_, item]) => (
          <li key={item.timestamp}>
            <HistoryItem item={item} />
          </li>
        ))}
        {history.length === 0 && (
          <div className="text-slate-500 text-center text-xs py-5">
            <span className="text-sm">{chrome.i18n.getMessage('noData')}</span>
            <br />
            {chrome.i18n.getMessage('noDataHint')}
          </div>
        )}
      </ul>
    </>
  );
};

export default History;
