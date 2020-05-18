import { SaveStateService } from './save_state.service';
import { ChatService } from './chat_state.sevice';
import { Web3WalletService } from './web3wallet.service';

export const saveStateService = new SaveStateService();
export const chatService = new ChatService();
export const web3WalletService = new Web3WalletService();
