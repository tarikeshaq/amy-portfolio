// Every page of the site. Tests iterate over this list, so adding a page here
// gets it the generic checks (renders, no overflow, images load, no errors) for free.
export const routes = [
  { path: "/", h1: /Hi! I.m Amy/, activeNav: "HOME" },
  { path: "/about/", h1: /As a designer/, activeNav: "ABOUT" },
  { path: "/work/compute-costs/", h1: /Cutting compute costs by 30%/, activeNav: "WORK" },
  { path: "/work/thought-partner/", h1: /Turning an AI black box into a thought partner/, activeNav: "WORK" },
] as const;
