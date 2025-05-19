# espirion-core
HTML/CSS/JS base components

## @espirion/core Folder Structure

espirion-core/
- public/                                   # Static files for development/preview
  - preview.html                          # Live test preview of components

- src/                                      # Source files for the core library
  - index.js                              # Main entry (registers all components)
  - index.css                             # Main CSS entry (tokens + base + themes)

  - components/                           # All Web Components
    - x-button/
      - x-button.js                   # Button component (Custom Element logic)
      - x-button.css                  # Scoped styles (can be inlined in JS too)
      - index.js                      # Exports + registers the component
    - x-input/
      - ...                           # Another component
    - ...                               # More components (x-modal, x-tabs, etc.)

  - tokens/                               # Design Tokens (CSS Variables or JS)
    - colors.css                        # Primary, secondary, neutral, etc.
    - spacing.css                       # Spacing scales
    - typography.css                    # Font sizes, weights, families
    - elevation.css                     # Shadows and z-index
    - radius.css                        # Border radius values

  - themes/                               # Theme definitions (built on tokens)
    - espirion-light.css
    - espirion-dark.css
    - github-light.css
    - github-dark.css
    - fluent-light.css
    - fluent-dark.css

  - styles/                               # Base styling, resets, global utilities
    - reset.css                         # Normalize or reset styles
    - base.css                          # Global font, box-sizing, etc.
    - utilities.css                     # Margin/padding/flex utility classes

  - utils/                                # JS utilities shared by components
    - theme.js                          # Theme switching logic (setTheme, getTheme)
    - dom.js                            # DOM helpers (addClass, removeClass)
    - config.js                         # Global config (prefixes, flags)

  - icons/                                # Optional custom icon system
    - sprite.svg                        # SVG sprite (if using inline icons)
    - espirion-icons.css                # Icon font or sprite CSS
    - map.json                          # Icon name map (optional)

  - types/                                # Optional: JSDoc or TypeScript types
    - index.d.ts                        # Type declarations (if any)

- scripts/                                  # Utility scripts
  - build.js                            # Custom build steps (optional)
  - tokens-to-css.js                    # Token conversion (JS/JSON to CSS)
  - publish.js                          # NPM publishing script

- tests/                                    # Unit and visual tests for components
  - x-button.test.js                    # Button tests using Jest/Web Test Runner
  - setup.js                            # Setup test environment
  - ...                                 # More tests

- stories/                                  # Stories/demos (can power Storybook or custom preview)
  - x-button.story.html
  - theme-switcher.story.html
  - ...

- dist/                                     # Output directory from Rollup build
  - index.js
  - index.css
  - themes/
    - *.css

- .github/                                  # GitHub workflows, issue templates, etc.
  - workflows/
    - ci.yml                            # GitHub Action for lint/test/build

- .gitignore                              # Ignore build artifacts and node_modules
- rollup.config.js                        # Rollup build configuration
- package.json                            # NPM package manifest
- README.md                               # Overview and usage of the core package
- CONTRIBUTING.md                         # Contribution guidelines


espirion-core/
│
├── public/                            # Static files for development/preview
│   └── preview.html                   # Live test preview of components
│
├── src/                               # Source files for the core library
│
│   ├── index.js                       # Main entry (registers all components)
│   ├── index.css                      # Main CSS entry (tokens + base + themes)
│
│   ├── components/                    # All Web Components
│   │   ├── x-button/
│   │   │   ├── x-button.js            # Button component (Custom Element logic)
│   │   │   ├── x-button.css           # Scoped styles (can be inlined in JS too)
│   │   │   └── index.js               # Exports + registers the component
│   │   ├── x-input/
│   │   │   └── ...                    # Another component
│   │   └── ...                        # More components (x-modal, x-tabs, etc.)
│
│   ├── tokens/                        # Design Tokens (CSS Variables or JS)
│   │   ├── colors.css                 # Primary, secondary, neutral, etc.
│   │   ├── spacing.css                # Spacing scales
│   │   ├── typography.css             # Font sizes, weights, families
│   │   ├── elevation.css              # Shadows and z-index
│   │   └── radius.css                 # Border radius values
│
│   ├── themes/                        # Theme definitions (built on tokens)
│   │   ├── espirion-light.css
│   │   ├── espirion-dark.css
│   │   ├── github-light.css
│   │   ├── github-dark.css
│   │   ├── fluent-light.css
│   │   └── fluent-dark.css
│
│   ├── styles/                        # Base styling, resets, global utilities
│   │   ├── reset.css                  # Normalize or reset styles
│   │   ├── base.css                   # Global font, box-sizing, etc.
│   │   └── utilities.css              # Margin/padding/flex utility classes
│
│   ├── utils/                         # JS utilities shared by components
│   │   ├── theme.js                   # Theme switching logic (setTheme, getTheme)
│   │   ├── dom.js                     # DOM helpers (addClass, removeClass)
│   │   └── config.js                  # Global config (prefixes, flags)
│
│   ├── icons/                         # Optional custom icon system
│   │   ├── sprite.svg                 # SVG sprite (if using inline icons)
│   │   ├── espirion-icons.css        # Icon font or sprite CSS
│   │   └── map.json                   # Icon name map (optional)
│
│   ├── types/                         # Optional: JSDoc or TypeScript types
│   │   └── index.d.ts                 # Type declarations (if any)
│
├── scripts/                           # Utility scripts
│   ├── build.js                       # Custom build steps (optional)
│   ├── tokens-to-css.js               # Token conversion (JS/JSON to CSS)
│   └── publish.js                     # NPM publishing script
│
├── tests/                             # Unit and visual tests for components
│   ├── x-button.test.js               # Button tests using Jest/Web Test Runner
│   ├── setup.js                       # Setup test environment
│   └── ...                            # More tests
│
├── stories/                           # Stories/demos (can power Storybook or custom preview)
│   ├── x-button.story.html
│   ├── theme-switcher.story.html
│   └── ...
│
├── dist/                              # Output directory from Rollup build
│   ├── index.js
│   ├── index.css
│   └── themes/
│       └── *.css
│
├── .github/                           # GitHub workflows, issue templates, etc.
│   └── workflows/
│       └── ci.yml                     # GitHub Action for lint/test/build
│
├── .gitignore                         # Ignore build artifacts and node_modules
├── rollup.config.js                   # Rollup build configuration
├── package.json                       # NPM package manifest
├── README.md                          # Overview and usage of the core package
└── CONTRIBUTING.md                    # Contribution guidelines
