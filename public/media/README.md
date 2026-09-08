# Section media

Video and image assets for homepage sections that aren't screenshots (see
`public/work/` for those).

## Why section

Put the video at:

    public/media/why.mp4

Guidelines:

- MP4 (H.264), under ~8MB if it can manage it. This plays inline, muted,
  looping, autoplaying, so it has to stay light on a mobile connection.
- Landscape, the panel is roughly 4:3 on desktop and shorter on mobile. It
  crops with object-cover from the centre.
- No audio track needed; it will be muted regardless, since autoplay on the
  web requires that.
- Optionally add `public/media/why-poster.jpg`, a single frame shown while the
  video loads.
