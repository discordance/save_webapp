import React from 'react';
import './Chat.css';

// tag parser
import { TagParser } from '../lib/bot_tags_parser'

// state service
import { saveStateService } from "../lib/services";

import { Widget } from 'rasa-webchat';

function Chat() {
  return (
    <div className="Chat">
      <Widget
        initPayload={"hello"}
        socketUrl={"https://bot-ws.transversal.tech"}
        socketPath={"/socket.io/"}
        customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
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
            if(tag) {
              saveStateService.checkAction(tag);
            }
          },
          'connect': () => {},
          'disconnect': () => {},
        }}
      />
    </div>
  );
}

export default Chat;