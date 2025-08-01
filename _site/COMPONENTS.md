# Epic Landscape Designs - Component System

This document outlines the reusable components and styling patterns used across the Epic Landscape Designs website.

## Component Structure

### 1. Card Component (`_card.scss`)
A versatile card component used for project items, process steps, and other content cards.

**Usage:**
```html
<div class="card">
    <div class="card__image-container">
        <img src="image.jpg" alt="Description" class="card__image">
        <div class="card__overlay"></div>
    </div>
    <div class="card__content">
        <h3 class="card__title">Card Title</h3>
        <p class="card__description">Card description text</p>
    </div>
</div>
```

**Variants:**
- `card--no-hover`: Disables hover effects
- `card__number`: For numbered elements (process steps)

### 2. Form Component (`_form.scss`)
Standardized form styling for consistent user input elements.

**Usage:**
```html
<form class="form">
    <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-input">
        <div class="error-message" id="name-error"></div>
    </div>
    
    <div class="form-group">
        <label for="type" class="form-label">Type</label>
        <select id="type" class="form-select">
            <option value="">Select option</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea id="message" class="form-textarea"></textarea>
        <div class="character-count">0 / 2000 characters</div>
    </div>
</form>
```

### 3. Layout Component (`_layout.scss`)
Common layout patterns and grid systems.

**Page Layout:**
```html
<div class="page">
    <section class="page__header">
        <h1 class="page__title">Page Title</h1>
        <p class="page__description">Page description</p>
    </section>
</div>
```

**Grid Layouts:**
- `grid grid--2-columns`: Two-column responsive grid
- `grid grid--3-columns`: Three-column responsive grid  
- `grid grid--auto-fit`: Auto-fitting grid for cards

**Containers:**
- `container`: Standard container (1200px max)
- `container--narrow`: Narrow container (800px max)
- `container--wide`: Wide container (1400px max)

**Sections:**
- `section`: Standard section padding
- `section--small`: Reduced padding
- `section--large`: Increased padding
- `bg-section`: White background section

### 4. Decoration Component (`_decoration.scss`)
Reusable decorative elements like fern images.

**Usage:**
```html
<div class="bg-pattern--fern">
    {% include fern-decoration.html %}
</div>
```

**Fern Decoration Include:**
```html
<!-- _includes/fern-decoration.html -->
<div class="decoration decoration--fern-bottom-left">
    <img src="/assets/img/fern2.svg" alt="Fern decoration" class="decoration__image">
</div>
<div class="decoration decoration--fern-top-right">
    <img src="/assets/img/fern1.svg" alt="Fern decoration" class="decoration__image">
</div>
```

## Existing Components

### Button Component (`_button.scss`)
Standard button styling with hover effects.

**Usage:**
```html
<button class="btn">Button Text</button>
<a href="#" class="btn">Link Button</a>
```

### Hero Component (`_hero.scss`)
Main hero section with logo and decorative elements.

**Usage:**
```html
<section class="hero bg-pattern--fern">
    <div class="hero-logo">
        <!-- Logo content -->
    </div>
    {% include fern-decoration.html %}
</section>
```

## Design System

### Colors
- Primary: `#ffae4e` (Orange)
- Dark Grey: `#545454`
- Background Cream: `#fff4c9`
- Background White Cream: `#f1f1f2`
- Font Color: `#3b3d41`

### Typography
- Font Sizes: `1.6rem` (base), `1.8rem`, `2.4rem`, `3rem`, `3.2rem`, `4rem`
- Font Family: "Montserrat", sans-serif
- Font Weight: 300 (light), 500 (medium)

### Spacing
- Standard padding: `6rem` (desktop), `4rem` (mobile)
- Grid gaps: `2rem` (standard), `3rem` (larger)
- Container padding: `2rem` (desktop), `1rem` (mobile)

### Transitions
- Default transition: `all 0.3s ease`

## Implementation Guidelines

1. **Use Semantic Class Names**: Follow BEM methodology for component classes
2. **Responsive Design**: All components include mobile-first responsive design
3. **Accessibility**: Include proper ARIA labels and semantic HTML
4. **Performance**: Use CSS transforms and opacity for animations
5. **Consistency**: Reuse existing components rather than creating new ones

## File Structure

```
_sass/
├── abstract/
│   ├── _variables.scss    # Colors, fonts, spacing
│   ├── _mixins.scss       # Utility mixins
│   ├── _respond.scss      # Responsive breakpoints
│   └── _typography.scss   # Typography styles
├── components/
│   ├── _button.scss       # Button component
│   ├── _card.scss         # Card component
│   ├── _form.scss         # Form component
│   ├── _hero.scss         # Hero component
│   ├── _layout.scss       # Layout utilities
│   └── _decoration.scss   # Decorative elements
├── layout/
│   ├── _nav.scss          # Navigation
│   ├── _footer.scss       # Footer
│   └── _layout.scss       # Main layout
└── pages/
    ├── _contact.scss      # Contact page specific
    ├── _projects.scss     # Projects page specific
    ├── _process.scss      # Process page specific
    └── _success.scss      # Success page specific
```

## Migration Notes

When updating existing pages to use the new component system:

1. Replace page-specific classes with component classes
2. Use the new layout utilities for consistent spacing
3. Include the fern decoration component where needed
4. Update form elements to use the standardized form classes
5. Replace custom card styles with the card component 