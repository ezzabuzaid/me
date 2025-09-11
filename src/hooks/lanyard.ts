import { useStore } from '@nanostores/preact';
import { atom } from 'nanostores';
import { useEffect, useState } from 'preact/hooks';

import type { EventType, LanyardData } from '~/types/lanyard.ts';

const status = atom<LanyardData | null>(null);

interface UseLanyardOptions {
	initial?: LanyardData | null;
}

/**
 * Connects to the Lanyard API & listens for updates via a websocket.
 *
 * @see https://github.com/barbarbar338/react-use-lanyard/blob/main/src/lanyard.ts
 *
 * @param userId - The Discord user ID.
 *
 * @returns - The Lanyard API status & loading state.
 */
export function useLanyard(
	userId: string,
	options?: UseLanyardOptions,
): {
	loading: boolean;
	status: LanyardData | null;
} {
	const $status = useStore(status);

	const [_websocket, setWebsocket] = useState<WebSocket>();
	const [loading, setLoading] = useState<boolean>(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only ever run once on mount.
	useEffect(() => {
		const supportsWebSocket = 'WebSocket' in window || 'MozWebSocket' in window;
		if (!supportsWebSocket)
			throw new Error("Browser doesn't support WebSocket connections.");

		let heartbeat: NodeJS.Timeout;
		let socket: WebSocket;

		function connectWebsocket(): void {
			if (heartbeat) clearInterval(heartbeat);

			socket = new WebSocket('wss://api.lanyard.rest/socket');
			setWebsocket(socket);
			setLoading(true);

			socket.addEventListener('open', () => {
				socket.send(
					JSON.stringify({
						op: 2,
						d: { subscribe_to_id: userId },
					}),
				);

				heartbeat = setInterval(() => {
					socket.send(
						JSON.stringify({
							op: 3,
						}),
					);
				}, 30_000);
			});

			socket.addEventListener('message', ({ data }) => {
				const { t, d } = JSON.parse(data) as { t: EventType; d: LanyardData };
				if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
					status.set(d);
					if (loading) setLoading(false);
				}
			});

			socket.addEventListener('close', connectWebsocket);
		}

		connectWebsocket();

		return (): void => {
			clearInterval(heartbeat);
			socket.removeEventListener('close', connectWebsocket);
			socket.close();
		};
	}, []);

	if (loading && options?.initial)
		return {
			loading,
			status: options.initial,
		};

	return {
		loading,
		status: $status,
	};
}
