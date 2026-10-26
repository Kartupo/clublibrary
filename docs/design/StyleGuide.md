# Clublibrary Style Guide (WBS-2.1)

Shared visual style for the web (Next.js, Tailwind, shadcn/ui) and mobile (Expo) applications. The mobile tokens live in `mobile/src/theme.ts`; the web should expose the same values as Tailwind theme colors / CSS variables so both apps look the same.

The palette comes from the team's tattoo artwork: the teal cloak, the terracotta skirt, the sea, the sand, and the watercolor paper.

## 1. Colors

| Token | Hex | Used for |
|---|---|---|
| `primary` | `#1F5F5B` (cloak teal) | Primary buttons, links, active tab, focus ring, avatars |
| `accent` | `#B4552D` (terracotta) | Highlighted actions such as "Going" and "Join", badges, unread markers |
| `sea` | `#3A93A8` | Decoration only: banners, illustrations, secondary icons, charts |
| `sand` | `#E3C9A0` | Borders, dividers, input outlines, soft highlights, empty-state backgrounds |
| `background` | `#F5F3EF` (paper) | Screen background |
| `surface` | `#FFFFFF` | Cards, inputs, sheets |
| `text` | `#3B2F26` (coat brown) | Body text and headings |
| `muted` | `#7A6B5E` | Secondary text, timestamps, placeholders |
| `error` | `#B3261E` | Validation and failure messages |
| `success` | `#1F5F5B` | Confirmation messages (same as primary) |
| `onPrimary` | `#FFFFFF` | Text and icons on `primary` or `accent` |

Rules:
- One `primary` button per screen. Secondary actions are text links in `primary`.
- Use `accent` sparingly, for the single most important event or club action on a card.
- `sea` has a low contrast against white (about 3.5:1), so never use it for body text or text on buttons; use it only for decoration or large elements.
- Contrast checked against WCAG AA for text: `text` on `background` (high), `primary` on `background` (high), white on `primary` (high), white on `accent` (about 4.9:1).
- Dark mode is out of scope for version 1.0.0.

## 2. Typography

System font on both platforms (San Francisco on iOS, Roboto on Android, system sans on the web), so no font files are needed.

| Style | Size | Weight | Use |
|---|---|---|---|
| Title | 26 | Bold | Screen titles on auth screens |
| Heading | 20 | Bold | Section headings, club names |
| Subtitle | 15 | Regular | Descriptions under titles (`muted`) |
| Body | 16 | Regular | Default text, input values |
| Label | 14 | Medium | Field labels, button text on links |
| Caption | 12 | Regular | Timestamps, counters (`muted`) |

Copy style: sentence case, verb-first button labels ("Send reset link"), no exclamation marks in system messages.

## 3. Shape, spacing and elevation

- **Corner radius:** 10 px for buttons, inputs, cards, and chips. Avatars are circles. Bottom sheets round only the top corners (16 px).
- **Spacing scale:** 4, 8, 16, 24, 32 px. Screen padding is 24 px; spacing between a field and the next is 14 px.
- **Elevation:** flat. Cards use a 1 px `sand` border, with no shadows.
- **Touch targets:** at least 48 px tall for buttons and tab bar items.

## 4. Components

| Component | Spec |
|---|---|
| Button (primary) | `primary` fill, `onPrimary` text, 48 px high, 10 px radius, full width in forms |
| Button (link) | Transparent, `primary` text, 15 px |
| Button (accent) | `accent` fill, used for "Going" and "Join" on cards |
| Text field | Label above (14, medium), white fill, 1 px `sand` border, error text below in `error`; border turns `error` on invalid input |
| Card | `surface` fill, 1 px `sand` border, 10 px radius, 12 px padding |
| Avatar | Circle, `primary` fill with white initials when there is no photo; 30 px in lists, 72 px on profiles |
| Badge | 12 px text, `sand` fill with `text` color for neutral; `accent` fill for pending or new |
| Role chip | Member, Manager, Captain shown as small badges on member lists |
| Banner / error | `error` text under the form, no colored box |
| Empty state | Centered icon in `sea`, one-line title, one-line explanation, one action |
| Loading | `ActivityIndicator` in `primary`; buttons show the spinner in place of their label |

## 5. Navigation

Five bottom tabs, always visible after login:

| Tab | Icon | Content |
|---|---|---|
| Home | home | Personal feed from joined and followed clubs (T-17) |
| Discover | search | Clubs, public events, popular posts, with search and filters (T-18) |
| Calendar | calendar | Personal calendar of upcoming events (T-14) |
| Clubs | users | Clubs and project teams the user joined or follows, club request (T-06, T-10, T-11) |
| Profile | user | Own profile, requests, settings, log out (T-05) |

The active tab uses `primary`; inactive tabs use `muted`. Auth screens (sign up, verify, log in, password reset) have no tab bar. Platform Administrator screens exist only in the web application.

## 6. Web alignment (for the Frontend Lead)

- Add the palette to `frontend/app/globals.css` as CSS variables, and map shadcn's `--primary`, `--background`, `--foreground`, `--border`, `--destructive` and `--radius` (0.625rem) to the tokens above.
- Keep the same names (`primary`, `accent`, `sand`, `sea`) in Tailwind so web and mobile code read the same.
- On wide screens, replace the bottom tab bar with a top or side navigation containing the same five items.
