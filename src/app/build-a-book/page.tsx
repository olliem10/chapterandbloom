import type { Metadata } from "next";
import { BuildABookClient } from "./BuildABookClient";

export const metadata: Metadata = {
  title: "Build A Book",
  description:
    "Choose a genre, a bookmark and a sticker to build your own fully custom Chapter & Bloom bundle for a fixed £19.99.",
};

export default function BuildABookPage() {
  return <BuildABookClient />;
}
