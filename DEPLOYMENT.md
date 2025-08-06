# Deployment Guide for AI Agent Decision Chart

This guide provides multiple deployment options for the interactive AI Agent Decision Chart.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment Options

### Option 1: Static File Hosting (Netlify, Vercel, GitHub Pages)

#### Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect your GitHub repo for automatic deployments

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

#### GitHub Pages
1. Build: `npm run build`
2. Push `dist` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Option 2: Traditional Web Server (Apache, Nginx)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy dist contents to web server:**
   ```bash
   # For Apache
   cp -r dist/* /var/www/html/

   # For Nginx
   cp -r dist/* /usr/share/nginx/html/
   ```

3. **Configure server (if needed):**
   - Ensure server can serve static files
   - Set up proper MIME types for .js and .css files

### Option 3: Docker Deployment

Create a Dockerfile:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
npm run build
docker build -t agent-chart .
docker run -p 8080:80 agent-chart
```

### Option 4: Node.js Server

Create a simple Express server:
```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Production Considerations

### Performance Optimization
- The build is already optimized with Vite
- Assets are minified and bundled
- Consider enabling gzip compression on your server

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ support (may need polyfills)

### Security Headers (for production servers)
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Troubleshooting

### Common Issues:
1. **Blank page after deployment:** Check browser console for errors
2. **404 for assets:** Ensure base path is correct in vite.config.js
3. **Chart not loading:** Verify Recharts library is properly bundled

### Development vs Production:
- Development uses hot reload and source maps
- Production build is optimized and minified
- Always test production build locally: `npm run preview`

## Custom Domain Setup

### For Netlify:
1. Go to Domain settings in Netlify dashboard
2. Add custom domain
3. Configure DNS records

### For other hosts:
1. Configure A record to point to server IP
2. Set up SSL certificate (Let's Encrypt recommended)
3. Configure server to serve from custom domain

## Environment Variables

If needed, create `.env` file:
```
VITE_API_URL=https://your-api.com
VITE_APP_TITLE=AI Agent Decision Chart
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Monitoring and Analytics

Consider adding:
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)

## Next Steps

After deployment, you can:
1. Add more scenarios to the chart data
2. Implement user feedback functionality
3. Add export capabilities (PDF, PNG)
4. Create admin panel for scenario management
5. Add user authentication if needed
