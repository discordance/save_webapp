// all available tag types
export enum ActionTags {
  WalletCreate = 'wallet_create',
  ClearChat = 'clear_chat',
  WalletCheck = 'wallet_check'
}


// helper
export class TagParser {
  //
  static parseTagInUtterance(utt: string): ActionTags | undefined {
    // tag regex
    const regex: RegExp = /<([a-z_]+)>/;

    // check if we match a tag
    const match = utt.match(regex);
    if (match) {
      const tag = match[1];
      // get corresponding ActionTag variant
      for (const k in ActionTags) {
        if (tag === ActionTags[k]) {
          return ActionTags[k];
        }
      }
    }
  }
}