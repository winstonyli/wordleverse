/** Creates a prop with *pizzazz*. */
export function prop(display: Displayable, opts: Options): ComplexProp {
	return {
		toString: () => display.toString(),
		toFullString: () => (opts.full || display).toString(),
		valueOf: () => opts.value?.valueOf() || NaN,
	};
}

export type Prop = (string | number | ComplexProp) | readonly (string | number | ComplexProp)[];
export type Props = { src: string; aliases?: readonly string[] } & Record<string, Prop>;
export type Set = Record<string, Props>;

interface ComplexProp extends Displayable, Numeric {
	toFullString(): string;
}

export interface Options {
	full?: Displayable;
	value?: Numeric;
}

interface Displayable {
	toString(): string;
}

interface Numeric {
	valueOf(): number;
}
