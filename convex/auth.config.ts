"use client";

import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://balanced-tiger-91.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;