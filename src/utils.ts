import { MAX_HISTORY_SIZE, Status } from './constants';

export const getInfoFromTab = (
  tab?: chrome.tabs.Tab
): CollectionRequest | null => {
  if (!tab || !tab.title || !tab.url) {
    console.log('[Send] Failed to get info from tab', tab);
    return null;
  }
  return {
    tabId: tab.id,
    url: tab.url,
    title: tab.title,
    timestamp: Date.now(),
  };
};

export const openInNewTab = (url: string) => {
  chrome.tabs.create({ url });
};

export const updateHistory = (data: ProcessedItem) => {
  chrome.storage.local.get('history', ({ history }) => {
    history = new Map(history);
    history.set(data.timestamp, data);
    const newHistory = Array.from<HistoryItem>(history)
      .sort((a, b) => b[0] - a[0])
      .slice(0, MAX_HISTORY_SIZE);
    chrome.storage.local.set({
      history: newHistory,
    });
  });
};

export const updateBadgeStatus = (status: Status, tabId?: number) => {
  const texts = {
    [Status.PENDING]: '⭮',
    [Status.SUCCESS]: '✓',
    [Status.ERROR]: '✗',
  };
  const colors = {
    [Status.PENDING]: '#9ca3af',
    [Status.SUCCESS]: '#10b981',
    [Status.ERROR]: '#f43f5e',
  };
  chrome.action.setBadgeText({ tabId, text: texts[status] });
  chrome.action.setBadgeBackgroundColor({ tabId, color: colors[status] });
};

export const fetchWithTimeout = async (
  resource: RequestInfo,
  options: RequestInit & { timeout?: number } = {}
) => {
  const { timeout = 7000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export const localizeHtml = () => {
  const localizeAttr = 'data-localize';
  document.querySelectorAll(`[${localizeAttr}]`).forEach((elem) => {
    elem.innerHTML = chrome.i18n.getMessage(
      elem.getAttribute(localizeAttr) || ''
    );
  });
  document
    .querySelector('html')
    ?.setAttribute('lang', chrome.i18n.getUILanguage());
};
