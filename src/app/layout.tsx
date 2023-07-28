import "./globals.scss";

import React from "react";

import { inter } from "@/app/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ommel Samvirke",
    description: "Samarbejde mellem foreningerne i Ommel",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="da">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
