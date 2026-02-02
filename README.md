# Do More Media - Professional Videography Website

A modern, professional website for Do More Media - a videography and drone services business based in Hastings, East Sussex.

## Features

- **Modern Design**: Clean, minimalist aesthetic with black and red color scheme
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Project Showcase**: Large, impactful project cards with modal video players
- **Contact Form**: Functional contact form with validation
- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Performance Optimized**: Lazy loading images, debounced scroll events

## File Structure

```
Do More Media/
├── index.html      # Main HTML file
├── styles.css      # All CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This documentation file
```

## Quick Start

1. Download or clone the project files
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required.

## Customization Guide

### Updating Personal Information

**Contact Details** (index.html, lines 337-362):
```html
<div class="contact-item">
    <strong>Phone</strong>
    <p><a href="tel:07397722882">07397 722 882</a></p>
</div>
```

**Social Media Links** (index.html):
- Search for `instagram.com/Dominic_Hayles` and replace with your Instagram
- Search for `tiktok.com/@DoMoreMedia` and replace with your TikTok

### Replacing Images

All images currently use Unsplash placeholders. To replace:

1. **Hero Image**: Find `hero-background` in index.html and update the `src`:
```html
<img src="your-hero-image.jpg" alt="Description">
```

2. **About Photo**: Find `about-image` section and update the `src`

3. **Project Images**: Each `.project-image` contains an `<img>` tag - update the `src` for each project

**Recommended Image Sizes**:
- Hero: 1920x1080px minimum
- Projects: 1600x900px minimum
- About photo: 600x750px

### Adding Real YouTube Videos

The modals are set up for YouTube embeds. To add your videos:

1. Find the modal section (starts around line 395)
2. Replace the `data-src` URL with your YouTube embed URL:
```html
<iframe src="" data-src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...></iframe>
```

**Getting YouTube Embed URL**:
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from the `src` attribute (format: `https://www.youtube.com/embed/VIDEO_ID`)

### Adding New Projects

To add a new project:

1. Add a new project card in the projects section:
```html
<article class="project-card scroll-animate" data-project="newproject">
    <div class="project-image">
        <img src="your-image.jpg" alt="Project Name" loading="lazy">
    </div>
    <div class="project-overlay"></div>
    <div class="project-content">
        <span class="project-category">Category</span>
        <h3 class="project-title">Project Name</h3>
        <p class="project-subtitle">Discover the ...</p>
        <button class="btn btn-outline project-btn" data-modal="newproject">View Project</button>
    </div>
</article>
```

2. Add a corresponding modal:
```html
<div class="modal" id="modal-newproject">
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="modal-content">
        <span class="modal-category">Category</span>
        <h2 class="modal-title">Project Name</h2>
        <p class="modal-description">Your project description...</p>
        <div class="modal-video">
            <iframe src="" data-src="YOUR_YOUTUBE_EMBED_URL" ...></iframe>
        </div>
    </div>
</div>
```

### Changing Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #000000;    /* Main black */
    --accent-color: #ff0000;     /* Red accent */
    --accent-hover: #cc0000;     /* Darker red for hovers */
    --text-color: #333333;       /* Main text */
    --light-text: #666666;       /* Secondary text */
    --bg-white: #ffffff;         /* White backgrounds */
    --bg-light: #f8f8f8;         /* Light gray backgrounds */
}
```

### Updating Services

Services are in the `.services-grid` section. Each service card follows this structure:
```html
<div class="service-card scroll-animate">
    <div class="service-icon">
        <!-- SVG icon here -->
    </div>
    <h3 class="service-title">Service Name</h3>
    <p class="service-description">Description text...</p>
</div>
```

## Form Integration

The contact form currently logs submissions to the console. To make it functional:

### Option 1: Formspree (Easy, Free)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form tag:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

### Option 2: Netlify Forms
If hosting on Netlify, add `netlify` attribute:
```html
<form name="contact" netlify class="contact-form">
```

### Option 3: Custom Backend
Connect to your own backend by modifying the `handleFormSubmit` function in `script.js`.

## Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select "main" branch and save
5. Your site will be live at `username.github.io/repository-name`

### Netlify (Free)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site is live instantly with a Netlify subdomain
4. Optional: Connect a custom domain

### Vercel (Free)
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Automatic deployments on every push

### Traditional Hosting
Upload all files via FTP to your web host's public_html folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Compress images before uploading (use [squoosh.app](https://squoosh.app))
2. **Use WebP Format**: Convert images to WebP for smaller file sizes
3. **Enable Compression**: Ensure your server has gzip/brotli compression enabled
4. **Use a CDN**: Consider using a CDN for faster global delivery

## Future Enhancements

Consider adding:
- Blog section for case studies
- Client testimonial slider
- Equipment/gear page
- Pricing packages
- Before/after comparison slider
- Instagram feed integration
- Cookie consent banner (for GDPR compliance)
- Google Analytics integration

## Credits

- Font: [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- Placeholder Images: [Unsplash](https://unsplash.com)
- Design Inspiration: [Ben Maclean](https://www.benmaclean.co.uk)

## License

This website template was created for Do More Media. Feel free to customize for personal/commercial use.

---

**Need Help?**

For questions about customization or deployment, feel free to reach out.

Built with vanilla HTML, CSS, and JavaScript - no frameworks required!
