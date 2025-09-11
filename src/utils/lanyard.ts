import type { LanyardData, LanyardResponse } from '~/types/lanyard.ts';

const API_BASE_URL = 'https://api.lanyard.rest/';

/**
 * Fetches the Lanyard API for a user's status.
 *
 * @see https://github.com/Phineas/lanyard#getting-a-user-s-presence-data
 *
 * @param userId - The Discord user ID.
 *
 * @returns The user's Lanyard data or `null` if an error occured / the user is not found.
 */
export async function getLanyardUser(userId: string): Promise<LanyardData | null> {
	try {
		const url = new URL(`/v1/users/${userId}`, API_BASE_URL);

		const response = await fetch(url.href);
		if (!response.ok) throw new Error('An invalid error occured');

		const json = (await response.json()) as LanyardResponse;

		if (!json.success)
			throw new Error(json.error?.message || 'An invalid error occured');

		return json.data;
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Logging is okay / required here
		console.error(error);
		return null;
	}
}
