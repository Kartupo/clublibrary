# Clublibrary Style Guide (WBS-2.1)

Shared visual style for the web (Next.js, Tailwind, shadcn/ui) and mobile (Expo) applications. The mobile tokens live in `mobile/src/theme.ts`; the web should expose the same values as Tailwind theme colors / CSS variables so both apps look the same.

The palette comes from the team's tattoo artwork: the teal cloak, the terracotta skirt, the sea, the sand, and the watercolor paper.

## 1. Colors

| Token | Hex | Used for |
|---|---|---|
| `primary` | `#1F5F5B` (cloak teal) | Primary buttons, links, active tab, focus ring, avatars |
| `accent` | `#AD512B` (terracotta) | Highlighted actions such as "Going" and "Join", badges, unread markers (always as a fill with `onPrimary` text) |
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
- Use `accent` only as a fill with `onPrimary` text, never as a text color on `background` or `surface`.
- On a `sand` background, text uses `text`, never `muted` (`muted` on `sand` is only about 3.2:1).
- `sea` has a low contrast against white (about 3.5:1), so never use it for body text or text on buttons; use it only for decoration or large elements.
- Contrast checked against WCAG AA for text (at least 4.5:1, Requirements Specification NFR-13): `text` on `background` (about 11.7:1), `primary` on `background` (about 6.7:1), white on `primary` (about 7.4:1), white on `accent` (about 5.3:1), `accent` on `background` (about 4.8:1), `muted` on `background` (about 4.6:1), `error` on `background` (about 5.9:1), `text` on `sand` (about 8.1:1).
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

Copy style: all interface text in English, sentence case, verb-first button labels ("Send reset link"), no exclamation marks in system messages.

**Dates and times** (the same on web and mobile, always in the device's time zone):

| Where | Format | Example |
|---|---|---|
| Events (cards, event page, calendar) | Weekday, day, month, 24-hour time | Thu 12 Nov, 18:00 (with end time: 18:00–20:00) |
| Posts and comments, under one week old | Relative | 5 min ago, 2h ago, 3d ago |
| Posts and comments, older | Day and month (and year if not the current year) | 12 Nov, 12 Nov 2025 |

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
| Badge | 12 px text, `sand` fill with `text` color for neutral (for example "Members only"); `accent` fill with `onPrimary` text for pending, new, or warnings (for example "Same name" on administrator screens) |
| Role chip | Member, Manager, Captain shown as small badges on member lists |
| Banner / error | `error` text under the form, no colored box |
| Empty state | Centered icon in `sea`, one-line title, one-line explanation, one action |
| Loading | `ActivityIndicator` in `primary`; buttons show the spinner in place of their label |
| Button (disabled) | `sand` fill, `muted` text, no press effect. Used for "RSVP closed" after an event starts and for "Resend e-mail" during its 30-second wait (the label shows the remaining seconds) |
| Progress bar | 6 px high, `sand` track, `primary` fill, percentage in Caption on the right; one bar per photo or video while it uploads |
| File field | Label above, `[ Choose file ]` link button, the chosen file name in Body, and the allowed formats and maximum size below in Caption (`muted`). Used for the club request proof and post media |
| Teaser card | Card with `background` fill instead of `surface`, event title, type, and start date and time, a "Members only" badge (neutral), and the line "Join the club to see details" in `muted`. No location, description, or RSVP buttons |
| Table (web, administrator) | shadcn/ui table: header row in Label style, 1 px `sand` row dividers, 48 px rows, actions as link buttons in the last column |

## 5. Navigation

Five bottom tabs, always visible after login:

| Tab | Icon | Content |
|---|---|---|
| Home | home | Personal feed from joined and followed clubs (T-17) |
| Discover | search | Clubs, public events, popular posts, with search and filters (T-18) |
| Calendar | calendar | Personal calendar of upcoming events from joined and followed clubs and of events the user is going to (T-14) |
| Clubs | users | Clubs and project teams the user joined or follows, club request (T-06, T-10, T-11) |
| Profile | user | Own profile, requests, settings, log out (T-05) |

The active tab uses `primary`; inactive tabs use `muted`. Auth screens (sign up, verify, log in, password reset) have no tab bar.

**Platform Administrator (web only).** Administrator accounts do not get the five tabs. They get a top navigation with **Club requests** (W-01) and **Clubs** (W-02: club pages in read-only form, without Join, Follow, RSVP, like, or comment buttons), and a *Log out* link.

## 6. Web alignment (for the Frontend Lead)

- `accent` changed from `#B4552D` to `#AD512B` for contrast; update it in `mobile/src/theme.ts` and in `frontend/app/globals.css` too.
- Add the palette to `frontend/app/globals.css` as CSS variables, and map shadcn's `--primary`, `--background`, `--foreground`, `--border`, `--destructive` and `--radius` (0.625rem) to the tokens above.
- Keep the same names (`primary`, `accent`, `sand`, `sea`) in Tailwind so web and mobile code read the same.
- On wide screens, replace the bottom tab bar with a top or side navigation containing the same five items.
