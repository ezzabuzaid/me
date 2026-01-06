/**
 * Rehype plugin to add lazy loading and performance attributes to images
 *
 * This plugin:
 * - Adds loading="lazy" to images (except first image)
 * - Adds decoding="async" to all images
 * - Adds width/height attributes if missing (for CLS prevention)
 * - Adds fetchpriority="high" to first image (LCP optimization)
 */

import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

export interface RehypeLazyImagesOptions {
	/**
	 * Skip lazy loading for the first N images
	 * Useful for above-the-fold images that should load immediately
	 * @default 1
	 */
	skipFirst?: number;

	/**
	 * Add fetchpriority="high" to the first image
	 * @default true
	 */
	prioritizeFirst?: boolean;

	/**
	 * Default width for images without width attribute
	 * @default undefined (no default width)
	 */
	defaultWidth?: number;

	/**
	 * Default height for images without height attribute
	 * @default undefined (no default height)
	 */
	defaultHeight?: number;
}

export function rehypeLazyImages(options: RehypeLazyImagesOptions = {}) {
	const {
		skipFirst = 1,
		prioritizeFirst = true,
		defaultWidth,
		defaultHeight,
	} = options;

	return (tree: Root) => {
		let imageIndex = 0;

		visit(tree, "element", (node: Element) => {
			if (node.tagName !== "img") return;

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

			// Add default dimensions if not present (prevents CLS)
			if (!properties.width && defaultWidth) {
				properties.width = defaultWidth;
			}
			if (!properties.height && defaultHeight) {
				properties.height = defaultHeight;
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
