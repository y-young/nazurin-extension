export enum MessageType {
  COLLECT_NEW,
  RETRY,
}

export enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}

export const MAX_HISTORY_SIZE = 5;

export const URL_PATTERNS = [
  // Pixiv
  '*://*.pixiv.net/*',
  '*://*.pximg.net/*',
  // Danbooru
  '*://danbooru.donmai.us/*',
  '*://safebooru.donmai.us/*',
  '*://cdn.donmai.us/*',
  // Moebooru
  '*://*.yande.re/*',
  '*://*.konachan.com/*',
  '*://*.lolibooru.moe/*',
  // Zerochan
  '*://*.zerochan.net/*',
  // Gelbooru
  '*://*.gelbooru.com/*',
  // Twitter
  '*://*.twitter.com/*',
  // ArtStation
  '*://*.artstation.com/*',
  // Wallhaven
  '*://*.wallhaven.cc/*',
  '*://*.whvn.cc/*',
  // Bilibili
  '*://t.bilibili.com/*',
  // Weibo
  '*://*.weibo.com/*',
  '*://*.weibo.cn/*',
  // DeviantArt
  '*://*.deviantart.com/*',
  // Lofter
  '*://*.lofter.com/*',
];
