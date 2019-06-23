// Type definitions for @pusher/chatkit-client
// Project: https://github.com/pusher/chatkit-client-js
// Definitions by: Alex Newark <https://github.com/Alex-231>
// Definitions: https://github.com/Alex-231/types_pusher__chatkit-client

import { Instance, Logger, BaseClient, TokenProvider as PlatformTokenProvider } from '@pusher/platform'

type File = any;

declare module "@pusher/chatkit-client" {

    interface AttachmentMessagePartPayload extends BasicMessagePartPayload {
        name: string;
        size: number;
        _id: string;
        _downloadURL: string;
        _expiration: Date;
    }
    class Attachment {
        type: string;
        name: string;
        size: number;
        customData?: any;
        private _id;
        private _downloadURL;
        private _expiration;
        private _roomId;
        private _instance;
        constructor(basicAttachment: AttachmentMessagePartPayload, roomId: string, instance: Instance);
        url(): Promise<string>;
        urlExpiry(): Date;
        private _fetchNewDownloadURL;
    }

    class ChatManager {
        userId: string;
        connectionTimeout: number;
        currentUser?: CurrentUser;
        serverInstanceV2: Instance;
        serverInstanceV4: Instance;
        filesInstance: Instance;
        cursorsInstance: Instance;
        presenceInstance: Instance;
        constructor({ instanceLocator, tokenProvider, userId, baseClient, logger, connectionTimeout }: {
            instanceLocator: string;
            tokenProvider: TokenProvider;
            userId: string;
            baseClient?: BaseClient;
            logger?: Logger;
            connectionTimeout?: number;
        });
        connect(hooks?: CurrentUser['hooks']['global']): Promise<CurrentUser>;
        disconnect(): void;
    }

    type Callbacks = {
        resolve: (data?: any) => void;
        reject: (error?: any) => void;
    };

    type MessageFetchDirection = 'older' | 'newer';

    class CurrentUser {
        id: string;
        encodedId: string;
        connectionTimeout: number;
        avatarURL?: string;
        createdAt?: string;
        customData?: any;
        name?: string;
        updatedAt?: string;
        serverInstanceV2: Instance;
        serverInstanceV4: Instance;
        filesInstance: Instance;
        cursorsInstance: Instance;
        presenceInstance: Instance;
        logger: Logger;
        presenceStore: PresenceStore;
        userStore: UserStore;
        roomStore: RoomStore;
        cursorStore: CursorStore;
        typingIndicators: TypingIndicators;
        roomSubscriptions: {
            [roomId: string]: RoomSubscription;
        };
        readCursorBuffer: {
            [roomId: string]: {
                position: number;
                callbacks: Callbacks[];
            };
        };
        userPresenceSubscriptions: {
            [userId: string]: UserPresenceSubscription;
        };
        userSubscription?: UserSubscription;
        presenceSubscription?: PresenceSubscription;
        hooks: {
            global: {
                onAddedToRoom?: (room: BasicRoom) => void;
                onRemovedFromRoom?: (room: BasicRoom) => void;
                onRoomUpdated?: (room: BasicRoom) => void;
                onRoomDeleted?: (room: BasicRoom) => void;
                onNewReadCursor?: (cursor: BasicCursor) => void;
                onUserStartedTyping?: (room: Room, user: User) => void;
                onUserStoppedTyping?: (room: Room, user: User) => void;
                onUserJoinedRoom?: (room: Room, user: User) => void;
                onUserLeftRoom?: (room: Room, user: User) => void;
                onPresenceChanged?: (state: {
                    current: Presence;
                    previous: Presence;
                }, user: User) => void;
            };
            rooms: {
                [roomId: string]: {
                    onMessage?: (data: Message) => any;
                    onNewReadCursor?: (cursor: Cursor) => void;
                    onUserJoined?: (user: User) => void;
                    onUserLeft?: (user: User) => void;
                    onPresenceChanged?: (state: {
                        current: Presence;
                        previous: Presence;
                    }, user: User) => void;
                    onUserStartedTyping?: (user: User) => void;
                    onUserStoppedTyping?: (user: User) => void;
                };
            };
        };
        constructor({ serverInstanceV2, serverInstanceV4, connectionTimeout, cursorsInstance, filesInstance, hooks, id, presenceInstance, }: {
            serverInstanceV2: Instance;
            serverInstanceV4: Instance;
            connectionTimeout: number;
            cursorsInstance: Instance;
            filesInstance: Instance;
            hooks: CurrentUser['hooks']['global'];
            id: string;
            presenceInstance: Instance;
        });
        readonly rooms: Room[];
        readonly users: User[];
        setReadCursor({ roomId, position }: {
            roomId: string;
            position: number;
        }): Promise<void>;
        readCursor({ roomId, userId }: {
            roomId: string;
            userId: string;
        }): Cursor;
        isTypingIn({ roomId }: {
            roomId: string;
        }): Promise<void>;
        createRoom({ name, addUserIds, customData, isPrivate }: {
            name: string;
            addUserIds: string[];
            customData?: any;
            isPrivate?: boolean;
        }): Promise<Room>;
        getJoinableRooms(): Promise<BasicRoom[]>;
        joinRoom({ roomId }: {
            roomId: string;
        }): Promise<Room>;
        leaveRoom({ roomId }: {
            roomId: string;
        }): Promise<Room>;
        addUserToRoom({ userId, roomId }: {
            userId: string;
            roomId: string;
        }): Promise<Room>;
        removeUserFromRoom({ userId, roomId }: {
            userId: string;
            roomId: string;
        }): Promise<Room>;
        sendMessage({ text, roomId, attachment }: {
            text: string;
            roomId: string;
            attachment?: {
                file?: File;
                link?: string;
                type?: 'image' | 'video' | 'audio' | 'file';
                name?: string;
            };
        }): Promise<any>;
        sendSimpleMessage({ roomId, text }: {
            roomId: string;
            text: string;
        }): Promise<any>;
        sendMultipartMessage({ roomId, parts }: {
            roomId: string;
            parts: {
                type: string;
                content?: string;
                url?: string;
                customData?: any;
                file?: File;
                name?: string;
            }[];
        }): Promise<any>;
        fetchMessages({ roomId, initialId, limit, direction, serverInstance }: {
            roomId: string;
            initialId?: number;
            limit?: number;
            direction?: MessageFetchDirection;
            serverInstance?: Instance;
        }): Promise<any[]>;
        fetchMultipartMessages(options: {
            roomId: string;
            initialId?: number;
            limit?: number;
            direction?: MessageFetchDirection;
        }): Promise<any[]>;
        subscribeToRoom({ roomId, hooks, messageLimit, serverInstance }: {
            roomId: string;
            hooks?: {
                onMessage?: (data: Message) => any;
                onNewReadCursor?: (cursor: Cursor) => void;
                onUserJoined?: (user: User) => void;
                onUserLeft?: (user: User) => void;
            };
            messageLimit?: number;
            serverInstance?: Instance;
        }): Promise<Room>;
        subscribeToRoomMultipart(options: {
            roomId: string;
            hooks?: {
                onMessage?: (data: Message) => any;
                onNewReadCursor?: (cursor: Cursor) => void;
                onUserJoined?: (user: User) => void;
                onUserLeft?: (user: User) => void;
            };
            messageLimit?: number;
        }): Promise<Room>;
        updateRoom({ roomId, name, customData, isPrivate }: {
            roomId: string;
            name: string;
            customData?: any;
            isPrivate: boolean;
        }): Promise<void>;
        deleteRoom({ roomId }: {
            roomId: string;
        }): Promise<void>;
        private setReadCursorRequest;
        private uploadDataAttachment;
        private _uploadAttachment;
        private isMemberOf;
        private isSubscribedTo;
        private decorateMessage;
        setPropertiesFromBasicUser(basicUser: BasicUser): void;
        establishUserSubscription(): Promise<(Room | Cursor)[]>;
        establishPresenceSubscription(): Promise<[void, void, void]>;
        private subscribeToUserPresence;
        disconnect(): void;
    }

    class CursorStore {
        instance: Instance;
        userStore: UserStore;
        roomStore: RoomStore;
        logger: Logger;
        cursors: {
            [key: string]: Cursor;
        };
        constructor({ instance, userStore, roomStore, logger }: {
            instance: Instance;
            userStore: UserStore;
            roomStore: RoomStore;
            logger: Logger;
        });
        set(basicCursor: BasicCursor): Promise<Cursor>;
        get(userId: string, roomId: string): Promise<void> | Promise<Cursor>;
        getSync(userId: string, roomId: string): Cursor;
        fetchBasicCursor(userId: string, roomId: string): Promise<BasicCursor | undefined>;
        decorate(basicCursor: BasicCursor): Cursor | undefined;
    }

    class CursorSubscription {
        private roomId;
        private cursorStore;
        private instance;
        private logger;
        private connectionTimeout;
        private timeout?;
        established: boolean;
        private onNewCursorHook;
        private sub?;
        private onSubscriptionEstablished?;
        constructor(options: {
            onNewCursorHook: (cursor: BasicCursor) => void;
            roomId: string;
            cursorStore: CursorStore;
            instance: Instance;
            logger: Logger;
            connectionTimeout: number;
        });
        connect(): Promise<Cursor[]>;
        cancel(): void;
        private onEvent;
        private onInitialState;
        private onNewCursor;
    }

    interface BasicCursor {
        position: number;
        updatedAt: string;
        userId: string;
        roomId: string;
        type: 0;
    }

    class Cursor implements BasicCursor {
        position: number;
        updatedAt: string;
        userId: string;
        roomId: string;
        type: 0;
        userStore: UserStore;
        roomStore: RoomStore;
        constructor(basicCursor: BasicCursor, userStore: UserStore, roomStore: RoomStore);
        readonly user: User;
        readonly room: Room;
    }

    class MembershipSubscription {
        private roomId;
        private userStore;
        private roomStore;
        private instance;
        private logger;
        private connectionTimeout;
        private onUserJoinedRoomHook;
        private onUserLeftRoomHook;
        private timeout?;
        established?: boolean;
        private sub?;
        private onSubscriptionEstablished?;
        constructor(options: {
            roomId: string;
            instance: Instance;
            userStore: UserStore;
            roomStore: RoomStore;
            logger: Logger;
            connectionTimeout: number;
            onUserJoinedRoomHook: (room: Room, user: User) => void;
            onUserLeftRoomHook: (room: Room, user: User) => void;
        });
        connect(): Promise<void>;
        cancel(): void;
        private onEvent;
        private onInitialState;
        private onUserJoined;
        private onUserLeft;
    }

    interface BasicMessagePartPayload {
        type: string;
        content?: string;
        url?: string;
        customData?: any;
        file?: File;
        name?: string;
        size?: number;
        _id?: string;
        _downloadURL?: string;
        _expiration?: Date;
    }
    interface BasicMessagePart {
        partType: 'inline' | 'url' | 'attachment';
        payload: AttachmentMessagePartPayload | BasicMessagePartPayload;
    }
    interface MessagePart {
        partType: 'inline' | 'url' | 'attachment';
        payload: Attachment | BasicMessagePartPayload;
    }
    interface BasicMessage {
        id: number;
        senderId: string;
        roomId: string;
        createdAt: string;
        updatedAt: string;
        parts?: BasicMessagePart[];
        text?: string;
        attachment?: {
            link: string;
            type: string;
            name: string;
        };
    }
    class Message {
        id: number;
        senderId: string;
        roomId: string;
        createdAt: string;
        updatedAt: string;
        parts: MessagePart[];
        private userStore;
        private roomStore;
        text?: string;
        attachment?: {
            link: string;
            type: string;
            name: string;
        };
        constructor(basicMessage: BasicMessage, userStore: UserStore, roomStore: RoomStore, instance: Instance);
        readonly sender: User;
        readonly room: Room;
    }

    class PresenceSubscription {
        private userId;
        private instance;
        private logger;
        private connectionTimeout;
        private timeout?;
        private sub?;
        constructor(options: {
            userId: string;
            instance: Instance;
            logger: Logger;
            connectionTimeout: number;
        });
        connect(): Promise<void>;
        cancel(): void;
        }

        type RoomUpdateData = Partial<BasicRoom & {
        userIds: string[];
        }>;
        class RoomStore {
        private instance;
        private userStore;
        private isSubscribedTo;
        private logger;
        private rooms;
        constructor(options: {
            instance: Instance;
            userStore: UserStore;
            isSubscribedTo: (userId: string) => boolean;
            logger: Logger;
        });
        setSync(basicRoom: BasicRoom): Room;
        set(basicRoom: BasicRoom): Promise<Room>;
        get(roomId: string): Promise<Room>;
        popSync(roomId: string): Room;
        pop(roomId: string): Promise<Room>;
        addUserToRoom(roomId: string, userId: string): Promise<Room>;
        removeUserFromRoom(roomId: string, userId: string): Promise<Room>;
        updateSync(roomId: string, updates: RoomUpdateData): Room;
        update(roomId: string, updates: RoomUpdateData): Promise<Room>;
        private fetchBasicRoom;
        snapshot(): {
            [roomId: string]: Room;
        };
        getSync(roomId: string): Room;
        private decorate;
    }

    class RoomSubscription {
        private cancelled;
        private connected;
        private messageSub;
        private cursorSub;
        private membershipSub;
        private buffer;
        constructor(options: {
            roomId: string;
            messageLimit?: number;
            userId: string;
            serverInstance: Instance;
            userStore: UserStore;
            roomStore: RoomStore;
            typingIndicators: TypingIndicators;
            logger: Logger;
            connectionTimeout: number;
            cursorStore: CursorStore;
            cursorsInstance: Instance;
            hooks: {
                rooms: {
                    [roomId: string]: {
                        onMessage?: (message: Message) => void;
                        onNewReadCursor?: (cursor: Cursor) => void;
                        onUserJoined?: (user: User) => void;
                        onUserLeft?: (user: User) => void;
                    };
                };
                global: {
                    onUserJoinedRoom?: (room: Room, user: User) => void;
                    onUserLeftRoom?: (room: Room, user: User) => void;
                };
            };
        });
        connect(): Promise<void>;
        cancel(): void;
        private bufferWhileConnecting;
        private flushBuffer;
    }

    interface BasicRoom {
        createdAt: string;
        createdByUserId: string;
        id: string;
        isPrivate: boolean;
        name: string;
        updatedAt: string;
        customData?: any;
        deletedAt: string;
        unreadCount: number;
        lastMessageAt: string;
        }
        class Room {
        createdAt: string;
        createdByUserId: string;
        id: string;
        isPrivate: boolean;
        name: string;
        updatedAt: string;
        customData?: any;
        deletedAt: string;
        unreadCount: number;
        lastMessageAt: string;
        userIds: string[];
        private userStore;
        private isSubscribedTo;
        private logger;
        constructor({ basicRoom, userStore, isSubscribedTo, logger }: {
            basicRoom: BasicRoom;
            userStore: UserStore;
            isSubscribedTo: (userId: string) => boolean;
            logger: Logger;
        });
        readonly users: User[];
        eq(other: BasicRoom): boolean;
    }

    class TokenProvider implements PlatformTokenProvider {
        userId?: string;
        private url;
        private queryParams;
        private headers;
        private withCredentials;
        private cachedToken?;
        private cacheExpiresAt;
        private req?;
        constructor({ url, queryParams, headers, withCredentials }: {
            url: string;
            queryParams?: any;
            headers?: {
                [header: string]: string;
            };
            withCredentials?: boolean;
        });
        clearToken(): void;
        fetchToken(): Promise<any>;
        fetchFreshToken(): Promise<{
            token: any;
            expiresIn: any;
        }>;
        private cacheIsStale;
        private cache;
        private clearCache;
        setUserId(userId: string): void;
    }

    class TypingIndicators {
        private logger;
        private instance;
        private hooks;
        private lastSentRequests;
        private timers;
        constructor({ hooks, instance, logger }: {
            hooks: TypingIndicators['hooks'];
            instance: Instance;
            logger: Logger;
        });
        sendThrottledRequest(roomId: string): Promise<void>;
        onIsTyping(room: Room, user: User): void;
        private onStarted;
        private onStopped;
    }

    class UserPresenceSubscription {
        private userId;
        private hooks;
        private instance;
        private userStore;
        private roomStore;
        private presenceStore;
        private logger;
        private connectionTimeout;
        private timeout?;
        private onSubscriptionEstablished?;
        private sub?;
        constructor(options: {
            userId: string;
            hooks: UserPresenceSubscription["hooks"];
            instance: Instance;
            userStore: UserStore;
            roomStore: RoomStore;
            presenceStore: PresenceStore;
            logger: Logger;
            connectionTimeout: number;
        });
        connect(): Promise<void>;
        cancel(): void;
        private onEvent;
        private onPresenceState;
    }

    class UserStore {
        private instance;
        private presenceStore;
        private logger;
        private reqs;
        onSetHooks: ((userId: string) => void)[];
        private users;
        constructor({ instance, presenceStore, logger }: {
            instance: Instance;
            presenceStore: PresenceStore;
            logger: Logger;
        });
        set(basicUser: BasicUser): Promise<User>;
        get(userId: string): Promise<User>;
        fetchMissingUsers(userIds: string[]): Promise<void[]>;
        fetchBasicUsers(userIds: string[]): void;
        snapshot(): {
            [userId: string]: User;
        };
        getSync(userId: string): User;
        private decorate;
    }

    class UserSubscription {
        private userId;
        private hooks;
        private readonly instance;
        private readonly roomStore;
        private readonly cursorStore;
        private readonly typingIndicators;
        private readonly logger;
        private readonly connectionTimeout;
        private readonly currentUser;
        private timeout?;
        private onSubscriptionEstablished?;
        private established;
        private sub?;
        constructor(options: {
            userId: string;
            hooks: UserSubscription["hooks"];
            instance: Instance;
            roomStore: RoomStore;
            cursorStore: CursorStore;
            typingIndicators: TypingIndicators;
            logger: Logger;
            connectionTimeout: number;
            currentUser: CurrentUser;
        });
        connect(): Promise<{
            basicUser: BasicUser;
            basicRooms: BasicRoom[];
            basicCursors: BasicCursor[];
        }>;
        cancel(): void;
        private onEvent;
        private onInitialState;
        private onAddedToRoom;
        private onRemovedFromRoom;
        private onRoomUpdated;
        private onRoomDeleted;
        private onNewCursor;
    }

    interface BasicUser {
        avatarURL: string;
        createdAt: string;
        customData?: any;
        id: string;
        name: string;
        updatedAt: string;
        }
        interface PresenceStore {
        [userId: string]: Presence;
        }
        type Presence = "unknown" | "online" | "offline";
        class User implements BasicUser {
        avatarURL: string;
        createdAt: string;
        customData?: any;
        id: string;
        name: string;
        updatedAt: string;
        private presenceStore;
        constructor(basicUser: BasicUser, presenceStore: PresenceStore);
        readonly presence: {
            state: Presence;
        };
    }
}