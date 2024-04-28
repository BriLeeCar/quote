export const OnClickHeader = ({
	headerText,
	clickInner,
	className,
	clickFunction,
}: {
	headerText: string;
	clickInner: any;
	className: string;
	clickFunction: any;
}) => {
	return (
		<h3 className={className}>
			<OnClickCancel clickInner={clickInner} clickFunction={clickFunction} />
			{headerText}
		</h3>
	);
};

export const OnClickCancel = ({
	clickInner,
	clickFunction,
}: {
	clickInner: any;
	clickFunction: any;
}) => {
	return (
		<button type="button" onClick={clickFunction} className="cancelX">
			{clickInner}
		</button>
	);
};
