import { createContext, useCallback, useState } from "react";

type ModalContextType = {
	modalContent: React.ReactNode | undefined;
	open: (modalContent: React.ReactNode) => void;
	close: () => void;
};

export const ModalContext = createContext<ModalContextType>({
	modalContent: undefined,
	open: () => null,
	close: () => null,
});

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {
	const [modalContent, setModalContent] = useState<React.ReactNode | undefined>(undefined);

	const open = useCallback((content: React.ReactNode) => setModalContent(content), []);
	const close = useCallback(() => setModalContent(undefined), []);

	return (
		<ModalContext.Provider value={{ modalContent, open, close }}>{children}</ModalContext.Provider>
	);
}
