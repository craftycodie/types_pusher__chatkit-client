// Type definitions for @pusher/chatkit-client
// Project: https://github.com/pusher/chatkit-client-js
// Definitions by: Alex Newark <https://github.com/Alex-231>
// Definitions: https://github.com/Alex-231/types_pusher__chatkit-client

import { Instance, Logger } from '@pusher/platform'

declare module "@pusher/chatkit-client" {

    class CurrentUser {
      sendMessage: (message: { text: string, roomId: string }) => Promise<void>;
      subscribeToRoom: (options: {
        roomId: string, hooks?: {
          onMessage: (data: { id: string, senderId: string, text: string, createdAt: string }) => any
        }
      }) => void;

      rooms: Room[];
      users: User[];
      currentSubscriptions: any; // Type needs defining.
    }
  
    class ChatManager {
      constructor(options: { instanceLocator: string, userId: string, tokenProvider: TokenProvider });
  
      connect: () => Promise<CurrentUser>;
      disconnect: () => void;
    }
  
    class TokenProvider {
      constructor(options: { url: string });
    }

    interface Room {
        id: string;
        isPrivate: boolean;
        name: string;
        users?: User[];
        unreadCount?: number;
        lastMessageAt?: string;
        customData: object; // Not fully mapped.

        // Undocumented - use with caution.
        createdByUserId?: string;
        deletedAt?: string;
        updatedAt?: string;
        userIds?: string[];
        userStore?: UserStore;
        isSubscribedTo?: (roomId: string) => boolean;
        logger?: Logger; // part of @pusher/platform.
    }

    class UserStore {
        constructor(options: {instance: Instance, presenceStore: PresenceStore, logger: Logger})
        instance: Instance;
        presenceStore: PresenceStore;
        logger?: Logger; 
        reqs?: { [userId: string]: any }; // Not fully typed.
        onSetHooks?: ((userId: string) => any)[];
    }

    interface BasicUser {
        avatarURL: string;
        createdAt?: string;
        customData?: object;
        id: string;
        name: string;
        updatedAt?: string;
    }

    interface User extends BasicUser {}
    class User { // Not fully typed.
        constructor(basicUser: BasicUser, presenceStore: PresenceStore);
        presence: { state: Presence };
        // Undocumented - use with caution.
        presenceStore?: PresenceStore;
    }

    enum Presence {
        unknown,
        online,
        offline,
    }

    interface PresenceStore {
        [userId: string]: Presence;
    }
}
  