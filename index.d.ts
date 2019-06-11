// Type definitions for @pusher/chatkit-client
// Project: https://github.com/pusher/chatkit-client-js
// Definitions by: Alex Newark <https://github.com/Alex-231>
// Definitions: https://github.com/Alex-231/types_pusher__chatkit-client


declare module "@pusher/chatkit-client" {
    class CurrentUser {
      sendMessage: (message: { text: string, roomId: string }) => Promise<void>;
      subscribeToRoom: (options: {
        roomId: string, hooks?: {
          onMessage: (data: { id: string, senderId: string, text: string, createdAt: string }) => any
        }
      }) => void;
    }
  
    class ChatManager {
      constructor(options: { instanceLocator: string, userId: string, tokenProvider: TokenProvider });
  
      connect: () => Promise<CurrentUser>;
    }
  
    class TokenProvider {
      constructor(options: { url: string });
    }
  }
  