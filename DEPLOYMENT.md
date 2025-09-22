# Day-One Application Deployment Guide

This guide explains how to deploy the Day-One application on Vercel with all three apps: Web, Studio, and Tickets.

## Application Structure

- **`apps/web`** - Next.js frontend application
- **`apps/studio`** - Sanity Studio (content management)
- **`apps/tickets`** - Sanity tickets application

## Deployment Options

### Option 1: Deploy as Separate Vercel Projects (Recommended)

This approach deploys each app as a separate Vercel project for better isolation and management.

#### 1. Deploy Web App

```bash
cd apps/web
vercel --prod
```

- Framework: Next.js
- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm build --filter=web`

#### 2. Deploy Studio App

```bash
cd apps/studio
vercel --prod
```

- Framework: Static
- Root Directory: `apps/studio`
- Build Command: `cd ../.. && pnpm build --filter=studio`
- Output Directory: `dist`

#### 3. Deploy Tickets App

```bash
cd apps/tickets
vercel --prod
```

- Framework: Static
- Root Directory: `apps/tickets`
- Build Command: `cd ../.. && pnpm build --filter=tickets`
- Output Directory: `dist`

### Option 2: Deploy as Monorepo (Alternative)

Deploy the entire monorepo as a single Vercel project with multiple deployments.

#### Setup

1. Connect your GitHub repository to Vercel
2. Configure the root directory as `/`
3. Vercel will automatically detect the monorepo structure
4. Set up environment variables for each app

## Environment Variables

### Required for all apps:

- `SANITY_PROJECT_ID` - Your Sanity project ID
- `SANITY_DATASET` - Your Sanity dataset (usually 'production')
- `SANITY_API_TOKEN` - Your Sanity API token (for server-side operations)

### Web App specific:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Public Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Public Sanity dataset

### Studio App specific:

- `SANITY_STUDIO_PROJECT_ID` - Studio project ID
- `SANITY_STUDIO_DATASET` - Studio dataset

## Build Commands

The following commands are available in the root package.json:

```bash
# Build all apps
pnpm build

# Build specific apps
pnpm build:web
pnpm build:studio
pnpm build:tickets

# Deploy Sanity Studio
pnpm deploy:studio

# Deploy everything
pnpm deploy:all
```

## URLs After Deployment

- **Web App**: `https://your-web-app.vercel.app`
- **Studio**: `https://your-studio-app.vercel.app`
- **Tickets**: `https://your-tickets-app.vercel.app`

## Post-Deployment Setup

1. **Configure CORS**: Update your Sanity project settings to allow your deployed domains
2. **Set up Webhooks**: Configure webhooks for real-time updates
3. **Test all functionality**: Verify that all apps work correctly in production
4. **Set up monitoring**: Configure error tracking and performance monitoring

## Troubleshooting

### Common Issues:

1. **Build Failures**: Ensure all dependencies are properly installed and Node.js version is compatible
2. **CORS Errors**: Update Sanity project settings with your deployed domains
3. **Environment Variables**: Double-check all required environment variables are set
4. **Routing Issues**: Verify the vercel.json configuration for proper routing

### Debug Commands:

```bash
# Check build locally
pnpm build

# Test studio locally
pnpm --filter=studio dev

# Test web app locally
pnpm --filter=web dev

# Test tickets app locally
pnpm --filter=tickets dev
```

## Maintenance

- **Regular Updates**: Keep dependencies updated
- **Monitoring**: Check Vercel analytics and Sanity usage
- **Backups**: Regular backups of your Sanity dataset
- **Performance**: Monitor and optimize build times and app performance
