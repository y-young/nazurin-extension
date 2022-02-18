import { MessageType, Status } from '../../constants';
import { getInfoFromTab, updateBadgeStatus, updateHistory } from '../../utils';

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
    apiHost: 'https://httpbin.org/post/',
    apiToken: '',
  });
  const api_url = new URL('/' + config.apiToken, config.apiHost).href; //+ '/api';
  return fetch(api_url, {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => {
      console.log('[Response]', response);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response;
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error !== 0) {
        if (response.msg) {
          throw new Error(response.msg);
        } else {
          throw new Error('Unknown error');
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
    .then(() => (data.status = Status.SUCCESS))
    .catch((error) => {
      console.error('[Fetch Error]', error);
      data.status = Status.ERROR;
      data.error = String(error);
      showNotification(
        'Nazurin: Request Failed',
        `${String(error)}\nURL: ${data.url}`
      );
    })
    .finally(() => {
      updateHistory(data);
      updateBadgeStatus(data.status, tabId);
    });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'Nazurin',
    title: 'Add to Collection',
    contexts: ['all'],
  });
  chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
    if (message.type === MessageType.COLLECT_NEW) {
      handleNewCollection(message as CollectNewMessage);
    }
    sendResponse();
  });
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
