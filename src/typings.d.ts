interface BasicInfo {
  title: string;
  url: string;
  timestamp: number;
}

interface ProcessedItem extends BasicInfo {
  status: import('constants').Status;
  error?: string;
}

interface CollectionRequest extends BasicInfo {
  tabId?: number;
}

type HistoryItem = [number, ProcessedItem];
type CollectionHistory = HistoryItem[];

interface Message {
  type: import('constants').MessageType;
  data: object;
}

interface CollectNewMessage extends Message {
  data: CollectionRequest;
}

interface RetryMessage extends Message {
  data: ProcessedItem;
}
