/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Vercel Edge when building for production.
 *
 * Learn more about the Vercel Edge integration here:
 * - https://qwik.dev/docs/deployments/vercel-edge/
 *
 */
import {
  createQwikCity,
  type PlatformVercel,
} from "@builder.io/qwik-city/middleware/vercel-edge";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

// This type augmentation is used by Qwik to merge platform-specific properties
declare global {
  // Use type instead of interface to avoid the empty interface lint error
  type QwikCityPlatform = PlatformVercel;
}

export default createQwikCity({ render, qwikCityPlan });
