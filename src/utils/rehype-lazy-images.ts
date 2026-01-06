/**
 * Rehype plugin to add lazy loading and performance attributes to images
 *
 * This plugin:
 * - Adds loading="lazy" to images (except first image)
 * - Adds decoding="async" to all images
 * - Adds fetchpriority="high" to first image (LCP optimization)
 */

export interface RehypeLazyImagesOptions {
	/**
	 * Skip lazy loading for the first N images
	 * @default 1
	 */
	skipFirst?: number;

	/**
	 * Add fetchpriority="high" to the first image
	 * @default true
	 */
	prioritizeFirst?: boolean;
}

interface HastNode {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
}

function visitImages(
	node: HastNode,
	callback: (node: HastNode) => void,
): void {
	if (node.type === "element" && node.tagName === "img") {
		callback(node);
	}
	if (node.children) {
		for (const child of node.children) {
			visitImages(child, callback);
		}
	}
}

export function rehypeLazyImages(options: RehypeLazyImagesOptions = {}) {
	const { skipFirst = 1, prioritizeFirst = true } = options;

	return (tree: HastNode) => {
		let imageIndex = 0;

		visitImages(tree, (node) => {
			const properties = node.properties || {};
			node.properties = properties;

			// Always add decoding="async" for better performance
			properties.decoding = "async";

			// Add lazy loading to images after the first N
			if (imageIndex >= skipFirst) {
				properties.loading = "lazy";
			} else if (prioritizeFirst && imageIndex === 0) {
				// Add high priority to first image for LCP
				properties.fetchpriority = "high";
			}

			// Ensure alt text exists (accessibility)
			if (!properties.alt) {
				properties.alt = "";
			}

			imageIndex++;
		});
	};
}

export default rehypeLazyImages;
