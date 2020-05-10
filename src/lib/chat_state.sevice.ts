// data structure that maps the local storage chat state
export interface ChatStorage {
  params: Params;
  lastUpdate: number;
  session_id: string;
  conversation: Conversation[];
  metadata: Metadata;
}

export interface Conversation {
  type: string;
  component: Component;
  text: string;
  sender: string;
  showAvatar: boolean;
  timestamp: number;
  hint?: string;
  quick_replies?: QuickReply[];
  chosenReply?: null;
}

export interface Component {
  compare: null;
  displayName: string;
  defaultTypes?: DefaultTypes;
}

export interface DefaultTypes {
  displayTypingIndication: boolean;
}

export interface QuickReply {
  title: string;
  type: string;
  payload: string;
}

export interface Metadata {
  tooltipSent: DOMHighlight;
  linkTarget: string;
  userInput: string;
  domHighlight: DOMHighlight;
  hintText: string;
  showTooltip: boolean;
}

export interface DOMHighlight {
}

export interface Params {
  unreadCount: number;
  connectingText: string;
  oldUrl: string;
  connected: boolean;
  inputTextFieldHint: string;
  docViewer: boolean;
  isChatOpen: boolean;
  disabledInput: boolean;
  pageChangeCallbacks: DOMHighlight;
  isChatVisible: boolean;
  initialized: boolean;
  messageDelayed: boolean;
}
