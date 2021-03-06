import React, { useLayoutEffect } from 'react';
import { FaCog, FaGithub, FaRegPaperPlane } from 'react-icons/fa';
import { MessageType } from '../../constants';
import { getInfoFromTab, localizeHtml, openInNewTab } from '../../utils';
import History from './History';

const Popup: React.FC = () => {
  useLayoutEffect(() => {
    localizeHtml();
  });

  const send = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const data = getInfoFromTab(tab);
    if (!data) {
      return;
    }
    chrome.runtime.sendMessage<CollectNewMessage>({
      type: MessageType.COLLECT_NEW,
      data,
    });
  };

  return (
    <main className="w-full gradient-theme">
      <section className="px-2 py-6">
        <button
          onClick={send}
          className="
            block w-1/3 border aspect-square mx-auto rounded-full shadow-lg
            text-orange-400
            bg-white hover:bg-slate-100 active:bg-slate-200
            transition-all duration-100"
          title={chrome.i18n.getMessage('sendButtonTitle')}
        >
          <FaRegPaperPlane className="inline" size="40" />
        </button>
        <div className="float-right">
          <button
            className="mr-1"
            onClick={() =>
              openInNewTab('https://github.com/y-young/nazurin-extension')
            }
            title="GitHub"
          >
            <FaGithub className="fill-white" size="15" />
          </button>
          <button
            onClick={() => chrome.runtime.openOptionsPage()}
            title={chrome.i18n.getMessage('settingsPageTitle')}
          >
            <FaCog className="fill-white" size="15" />
          </button>
        </div>
      </section>
      <section className="px-4 pt-4 pb-2 bg-white rounded-t-2xl shadow-xl">
        <History />
      </section>
    </main>
  );
};

export default Popup;
