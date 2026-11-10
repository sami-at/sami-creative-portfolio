# Samy | Portfolio

Two focused portfolio experiences under one personal brand:

- `/video-editing`: short-form editing for content creators
- `/web-development`: websites, applications, interfaces, and digital products
- `/`: home, portfolio directions, and experience

Built with React 19, Vite 7, plain CSS, and EmailJS.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

Vite produces the deployable site in `dist/`. `netlify.toml` builds and publishes that directory on Netlify. `public/_redirects` sends the old `/webdevelopment` URL to `/web-development` and serves the app for direct visits to its routes. `vercel.json` provides the equivalent SPA rewrite on Vercel.

## Structure

The three routes use `src/components/Studio.jsx` and `Studio.css`. The palette is near-black (#0d0f0d), soft white (#f5f3ef), orange (#f58b5b) for video editing, and green (#79bd70) for web development. The homepage follows the newer supplied reference with a photographic workspace hero, image-led portfolio cards, a three-step process, craft details, an About section, and an inline inquiry form.

The supplied workspace, mountain-editor, laptop, and timeline artwork lives in `public/visuals/` as optimized JPEGs, including a smaller mobile hero image. These are concept visuals; the web-project gallery retains the real project screenshots and links. The hero image becomes a separate section below the copy on mobile.

Shared navigation includes an About dialog. Specialty-page contact forms and FAQs use a native dialog with discipline tabs preselected by page. Home has a compact inquiry form with a discipline selector, backed by the same EmailJS submission and validation logic. The mobile menu supports Escape and restores focus to its trigger.

The video-editing route includes editing categories and a free sample offer for content creators and a raw/final visual comparison using the supplied editing artwork. The mountain editor artwork and workflow are interface illustrations, not client video or performance evidence. No generated portraits, fake views, or invented client footage are used.

The web-development route contains a photographic laptop hero, a three-card gallery expandable to all six existing projects, category filters, six services with descriptions, the supplied experience statistics, software-engineering background, web-specific FAQ, and contact form. Project names and descriptions come from the supplied live deployments. Local WebP previews live in `public/projects/`.

The supplied Passage deployment currently renders a blank page. Its preview uses the hero image referenced by that project’s deployed JavaScript rather than a fabricated screenshot.

## Contact integration

`src/components/Contact/Contact.jsx` uses the EmailJS account with service `service_cp8zkth` and template `template_phhpi8t`. The previous template was in the account signed in as `launchit.dev.team@gmail.com` and is no longer used by the site. The shared form adapts its labels and qualifying fields to each service while retaining required-field validation, duplicate-submission prevention, pending state, accessible feedback, direct email, and draft preservation on failure.

Paste [the contact template](design/emailjs-contact-template.html) into the new EmailJS template's HTML editor. Set **To Email** to `hello@sami-creative.com`, **Reply-To** to `{{email}}`, and **Subject** to `New {{portfolio}} inquiry from {{name}}`. Keep **From Email** as the connected service's verified address. Save and test the template, then submit a test message from the live site and confirm delivery to `hello@sami-creative.com`.

The site sends `name`, `email`, `portfolio`, `profile_label`, `profile`, `volume_label`, `volume`, `project_message`, `date`, and `time` for this template. It also sends the legacy combined `message` field so the current starter template stays readable until the new HTML is pasted.

The free spam controls are a hidden website field to catch simple bots, a two-minute cooldown after a successful submission when browser storage is available, and EmailJS SDK headless-browser blocking. EmailJS also applies [IP-based limits](https://www.emailjs.com/docs/faq/does-emailjs-expose-my-account-to-spam/). Browser-side controls can be bypassed by direct API calls; an enforceable custom IP limit would require a server-side endpoint and shared storage. No paid EmailJS features are required for the controls in this site.

## Verification

- Production build and ESLint pass.
- The inline inquiry form was checked with intercepted email requests: required fields, discipline selection, draft preservation after failure, success reset, and duplicate-submission cooldown. No real email was sent during these checks.
- `/`, `/video-editing`, and `/web-development` load directly.
- All three routes were checked from 320 to 1440 pixels, including tablet breakpoints, with no page-level horizontal overflow. Desktop and mobile screenshots were reviewed.
- Navigation, portfolio switching, mobile menu behavior, project previews, and all six live-site destinations were checked in Chrome.
- The video repository contains no public video files; the video route offers creators a free editing sample using their footage before they decide whether to work together.
