import React from 'react';
import './Chat.css';

// tag parser
import { TagParser } from '../lib/bot_tags_parser'

// state service
import { saveStateService, chatService } from "../lib/services";

import { Widget } from 'rasa-webchat';

function Chat() {
  // create a ref
  const chatEl = React.useRef();

  // on mount update the ref
  React.useEffect(() => {
    chatService.attachChatWidgetRef(chatEl);
    console.log('FUCK');
  });

  // the component
  return (
    <div className="Chat">
      <Widget
        ref={chatEl} // ref for further hacky stuff
        initPayload={"hello"}
        socketUrl={"https://bot-ws.transversal.tech"}
        socketPath={"/socket.io/"}
        customData={{ "language": "en" }}
        title={"SaveBot"}
        hideWhenNotConnected={false}
        embedded={true}
        onSocketEvent={{
          'bot_uttered': (utter) => {
            // can be image
            if (!utter.text) {
              return;
            }
            // parse
            const tag = TagParser.parseTagInUtterance(utter.text);

            // action
            if (tag) {
              saveStateService.checkAction(tag);
            }
          },
          'connect': () => { },
          'disconnect': () => { },
        }}
      />
    </div>
  );
}

export default Chat;