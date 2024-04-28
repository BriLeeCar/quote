import React, {
	ComponentProps,
	DetailedHTMLProps,
	JSXElementConstructor,
} from "react";

export function isEl(el: HTMLElement | null) {
	if (el) {
		return true;
	} else {
		return false;
	}
}

export function handleError(err: Error) {
	console.warn(err);
}
