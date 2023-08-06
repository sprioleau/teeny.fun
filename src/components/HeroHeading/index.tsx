import Heading from "../Heading";

export default function HeroHeading() {
	return (
		<Heading tag="h1">
			<Heading.Span
				text="teenify"
				color="yellow"
				index={0}
			/>
			<Heading.Span
				text="URLs with"
				color="white"
				index={1}
			/>
			<Heading.Span
				text="emojis"
				color="yellow"
				index={2}
			/>
		</Heading>
	);
}
