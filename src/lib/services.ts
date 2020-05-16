import { SaveStateService } from './save_state.service';
import { ChatService } from './chat_state.sevice';
import { MetamaskService } from './metamask.service';

export const saveStateService = new SaveStateService();
export const chatService = new ChatService();
export const metamaskService = new MetamaskService();
