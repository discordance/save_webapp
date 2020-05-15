import React from 'react';
import { Widget } from 'rasa-webchat';

export class ChatService {
  // get the chat widget ref
  private chatWidgetRef : React.MutableRefObject<Widget> | null = null;

  // map the chat storage
  private chatStorage: ChatStorage | null = null;

  constructor() {
    this.updateFromCache();

    // cleaner
    setInterval(()=> {
      this.stripActionTags();
    }, 200);
  }

  // attach chatWidgetRef
  attachChatWidgetRef(ref: React.MutableRefObject<Widget>) {
    this.chatWidgetRef = ref;
  }

  // clear chat
  clearChat() {
    if (this.chatStorage) {
      this.chatStorage.conversation = [];
      this.saveToCache();
      const widget : Widget = this.chatWidgetRef?.current;
      widget.forceInit();
    }
  }

  // strip action tags
  stripActionTags() {
    this.updateFromCache();
    if (this.chatStorage) {
      let updated = false;
      const newConv = this.chatStorage.conversation.map((m) => {
        if(m.text) {
          if(m.text.match(/<([a-z_]+)>/)){
            updated = true;
            m.text = m.text.replace(/<([a-z_]+)>/, '');
          }
        }
        return m;
      });
      if(!updated){
        return;
      }
      this.chatStorage.conversation = newConv;
      this.saveToCache();
      const widget : Widget = this.chatWidgetRef?.current;
      widget.forceInit();
    }
  }

  // read the local storage
  private updateFromCache() {
    let chatStorage = localStorage.getItem('chat_session');
    if (chatStorage) {
      const parsed = JSON.parse(chatStorage);
      this.chatStorage = parsed;
    }
  }

  // save chat state to cache
  private saveToCache() {
    if (this.chatStorage) {
      localStorage.setItem('chat_session', JSON.stringify(this.chatStorage));
    }
  }
}


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
