"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

/**
 * The config carries functions (validation, initialValue, icons), which cannot
 * cross the server/client boundary as props. Importing it inside the client
 * component keeps the whole thing on one side of that line.
 */
export const Studio = () => <NextStudio config={config} />;
