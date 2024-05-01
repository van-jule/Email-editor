import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryCLient}>
			{children}
		</QueryClientProvider>
	);
}
