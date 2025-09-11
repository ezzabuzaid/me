export type LanyardResponse =
	| {
			data: LanyardData;
			success: true;
	  }
	| {
			data: null;
			success: false;
			error: {
				code: number;
				message: string;
			};
	  };

export type EventType = 'INIT_STATE' | 'PRESENCE_UPDATE';

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface LanyardData {
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_web: boolean;
	activities: Array<Activity>;
	discord_status: DiscordStatus;
	discord_user: DiscordUser;
	kv?: Record<string, string>;
	listening_to_spotify: boolean;
	spotify?: Spotify;
}

interface Activity {
	application_id?: string;
	assets?: Assets;
	buttons?: Array<string>;
	created_at: number;
	details?: string;
	emoji?: Emoji;
	flags?: number;
	id: string;
	name: string;
	party?: Party;
	session_id?: string;
	state: string;
	sync_id?: string;
	timestamps?: Timestamps;
	type: number;
}

interface Assets {
	large_image: string;
	large_text: string;
	small_image: string;
	small_text: string;
}

interface Emoji {
	animated?: boolean;
	id?: string;
	name: string;
}

interface Party {
	id: string;
	size?: PartySize;
}

interface PartySize {
	current_size: number;
	max_size: number;
}

interface Spotify {
	album_art_url: string;
	album: string;
	artist: string;
	song: string;
	timestamps: Timestamps;
	track_id: string;
}

interface Timestamps {
	start: number;
}

interface DiscordUser {
	avatar: string;
	bot: boolean;
	discriminator: string;
	global_name: string | null;
	id: string;
	public_flags: number;
	username: string;
}
