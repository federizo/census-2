import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const jost = Jost({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://daily-todo-task.vercel.app/"),

	title: {
		template: "%s | PB Census",
		default: "PB Census",
	},
	authors: {
		name: "JAZCode",
	},
	description:
		"Build dashboard with role managemanet using next.js and supabase.",
	openGraph: {
		title: "PB Census",
		description: "A census for Pulong Buhangin Sta. Maria",
		url: "https://daily-todo-task.vercel.app/",
		siteName: "Daily Todo",
		images: "/og.png",
		type: "website",
	},
	keywords: ["daily web coding", "chensokheng", "dailywebcoding"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jost.className} antialiased dark:bg-[#09090B]`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<main className="">{children}</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
