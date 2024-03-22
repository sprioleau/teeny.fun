import Button from "@/components/Button";
import UserAvatar from "@/components/UserAvatar";
import {
	ClerkLoaded,
	ClerkLoading,
	SignInButton as ClerkSignInButton,
	SignOutButton as ClerkSignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import { AiOutlineUser } from "react-icons/ai";
import LoadingIcon from "../LoadingIcon";

export default function SignInOutButtons() {
	return (
		<>
			<ClerkLoading>
				{/* TODO: Animate if not alread done */}
				<LoadingIcon />
			</ClerkLoading>
			<ClerkLoaded>
				<SignedOut>
					<ClerkSignInButton
						mode="modal"
						afterSignInUrl="/dashboard"
					>
						<Button
							icon={<AiOutlineUser />}
							color="yellow"
						>
							Sign in
						</Button>
					</ClerkSignInButton>
				</SignedOut>
				<SignedIn>
					<ClerkSignOutButton redirectUrl="/">
						<Button icon={<UserAvatar />}>Sign Out</Button>
					</ClerkSignOutButton>
				</SignedIn>
			</ClerkLoaded>
		</>
	);
}
