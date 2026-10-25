# Image & Video Assets

This directory holds **all** replaceable image and video assets for the
portfolio. Do not scatter images across component code — reference paths from
`src/config.ts` instead.

## Structure

```
public/images/
  profile/            <- your portrait + avatar (profile-portrait.jpg, avatar.jpg)
  projects/
    brand-design/     <- brand identity project images
    graphic-design/   <- graphic design project images
    ai-images/        <- AI-generated still images
    ai-videos/        <- AI video poster frames (stills)
    printing/         <- print production project images
  services/           <- service section imagery
  shared/             <- shared decorative/placeholder imagery
public/videos/        <- actual .mp4 video files (posters live in images/)
```

## How to replace an asset

1. Drop the new file into the matching folder above.
2. Update the one path in `src/config.ts` that points to it.
3. Nothing else needs to change.

## Current placeholders

Until real assets are supplied, the site ships with lightweight SVG
placeholder files in each folder so there are no broken images. Replace them
with real `.jpg` / `.png` files when ready:

- JPG for photographic imagery (portraits, AI visuals, print photos).
- PNG for logos, graphics, and anything needing transparency.

## Notes

- Use descriptive filenames, e.g. `brand-identity-project-01.jpg`.
- Do not use the same image across unrelated projects.
- The hero portrait is **not** lazy-loaded, so it loads immediately.
- All other images use lazy loading for performance.
