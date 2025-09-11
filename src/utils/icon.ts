import type { LucideIcon } from 'lucide-preact';

/**
 * Dynamically load an icon from `lucide-preact` by icon name.
 *
 * @param iconName - The name of the icon to get.
 *
 * @returns The Astro component for the icon.
 */
export async function loadIcon(iconName: string): Promise<LucideIcon> {
	const mod = await import('lucide-preact');
	const key = iconName as keyof typeof import('lucide-preact');
	return mod[key] as LucideIcon;
}
