# 0001. Record architecture decisions

- Status: Accepted
- Date: 2026-11-01

## Context
The site is built mostly by coding agents across many sessions. Decisions made in
one session (stack, asset handling, layout strategy) are invisible to the next
unless written down, and an agent may "fix" something that was deliberate.

## Decision
We will record significant decisions as short Nygard-style ADRs in `docs/adr/`,
numbered sequentially from `0001` using [`0000-template.md`](0000-template.md).
Accepted ADRs are immutable; changing course means a new ADR that supersedes the old one.

## Alternatives considered
- Decision log inside `AGENTS.md`: grows unbounded and bloats every agent's context.
- No record: decisions get re-litigated or silently reversed.

## Consequences
A small overhead per decision. `AGENTS.md` stays lean and links here.
