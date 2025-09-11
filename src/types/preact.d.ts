import 'preact';

declare module 'preact' {
	// biome-ignore lint/style/noNamespace: <explanation>
	namespace JSX {
		interface HTMLAttributes<RefType extends EventTarget = EventTarget>
			extends ClassAttributes<RefType>,
				DOMAttributes<RefType>,
				AriaAttributes {
			tw?: string;
		}
	}
}
