import { MessageType, Status, URL_PATTERNS } from '../../constants';
import {
  fetchWithTimeout,
  getInfoFromTab,
  updateBadgeStatus,
  updateHistory,
} from '../../utils';

const showNotification = (title: string, message: string) => {
  chrome.notifications.create(String(Date.now()), {
    type: 'basic',
    iconUrl: 'icon-128.png',
    title,
    message,
  });
};

const sendRequest = async (url: string) => {
  console.log('[Collect]', url);
  const config = await chrome.storage.sync.get({
    apiHost: '',
    apiToken: '',
  });
  if (!config.apiHost || !config.apiToken) {
    throw new Error('Please set API Host and Bot Token.');
  }
  const apiUrl = new URL(`${config.apiToken}/api`, config.apiHost).href;
  return fetchWithTimeout(apiUrl, {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => {
      console.log('[Response]', response);
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status.toString()}, please check your settings.`
        );
      }
      return response;
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error !== 0) {
        if (response.msg) {
          throw new Error(response.msg);
        } else {
          throw new Error('Unknown error.');
        }
      }
    });
};

const handleNewCollection = (message: CollectNewMessage) => {
  const tabId = message.data.tabId;
  const data = message.data as ProcessedItem;
  data.status = Status.PENDING;
  updateHistory(data);
  updateBadgeStatus(data.status, tabId);
  sendRequest(data.url)
    .then(() => {
      data.status = Status.SUCCESS;
      data.error = undefined;
    })
    .catch((error: Error) => {
      console.log('[Fetch Error]', error);
      data.status = Status.ERROR;
      if (error.name === 'AbortError') {
        data.error = 'Request timed out, please try again.';
      } else {
        data.error = String(error);
      }
      showNotification(
        'Nazurin: Request Failed',
        `${data.error}\nURL: ${data.url}`
      );
    })
    .finally(() => {
      updateHistory(data);
      updateBadgeStatus(data.status, tabId);
    });
};

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: 'Nazurin',
    // Context menu i18n is not supported yet
    title: 'Add to Collection',
    contexts: ['all'],
    documentUrlPatterns: URL_PATTERNS,
  });
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  switch (message.type) {
    case MessageType.COLLECT_NEW:
    case MessageType.RETRY:
      handleNewCollection(message as CollectNewMessage);
      break;
  }
  sendResponse();
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const data = getInfoFromTab(tab);
    if (!data) {
      return;
    }
    const message: CollectNewMessage = {
      type: MessageType.COLLECT_NEW,
      data,
    };
    handleNewCollection(message);
  });
});
