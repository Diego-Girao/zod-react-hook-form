import type { Metadata } from "next"
import { Acme } from "next/font/google"
import "./globals.css"

const acme = Acme({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
	title: "React-Hook-Form",
	description: "React-Hook-Form, Zod and Shadcn",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={acme.className}>{children}</body>
		</html>
	)
}
