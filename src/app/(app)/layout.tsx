import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import React from "react";
import DataInitializer from "@/app/(app)/DataInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <DataInitializer />
      {children}
    </Layout>
  );
}
