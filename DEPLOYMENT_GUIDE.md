# TalentPulse AI - Deployment Guide

This comprehensive guide will walk you through deploying the TalentPulse AI application to Vercel and connecting your custom domain (talentpulse.com).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Configuration](#custom-domain-configuration)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- A Vercel account (https://vercel.com/signup)
- Access to your domain registrar for talentpulse.com
- A MongoDB Atlas account for database hosting (https://www.mongodb.com/cloud/atlas/register)
- Google Developer Console access for OAuth setup (https://console.developers.google.com/)

## Project Setup

1. Download the TalentPulse AI deployment package
2. Extract the package to your local machine
3. Open a terminal and navigate to the extracted directory
4. Install dependencies:
   ```
   npm install
   ```
5. Test the application locally:
   ```
   npm run dev
   ```
   Access at http://localhost:3000 to verify everything works correctly

## Vercel Deployment

1. Install Vercel CLI (optional):
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```
   
   Alternatively, you can deploy directly from the Vercel dashboard:
   
   a. Go to https://vercel.com/new
   b. Import your project from Git or upload the project files
   c. Configure project settings (use Next.js as framework preset)
   d. Click "Deploy"

## Environment Variables

Set the following environment variables in your Vercel project settings:

| Variable | Description | Example |
|----------|-------------|---------|
| NEXTAUTH_SECRET | Secret key for NextAuth.js | Generate with `openssl rand -base64 32` |
| NEXTAUTH_URL | Your domain URL | https://talentpulse.com |
| GOOGLE_CLIENT_ID | OAuth client ID | 123456789-abcdefg.apps.googleusercontent.com |
| GOOGLE_CLIENT_SECRET | OAuth client secret | GOCSPX-abcdefghijklmnop |
| MONGODB_URI | MongoDB connection string | mongodb+srv://username:password@cluster.mongodb.net/talentpulse |

To set environment variables:
1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add each variable and its value
4. Click "Save"

## Custom Domain Configuration

### 1. Add Your Domain in Vercel

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Domains"
3. Enter "talentpulse.com" and click "Add"
4. Vercel will provide DNS configuration instructions

### 2. Configure DNS at Your Registrar

#### Option 1: Using Vercel nameservers (recommended)
Update your domain's nameservers to Vercel's:
- ns1.vercel-dns.com
- ns2.vercel-dns.com

#### Option 2: Using DNS records
Add the following records to your DNS configuration:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

### 3. Verify Domain Configuration

1. Return to Vercel's domain settings
2. Wait for verification to complete (may take up to 48 hours for DNS propagation)
3. Vercel will automatically issue an SSL certificate

## Post-Deployment Verification

After deployment, verify:

1. Website loads correctly at https://talentpulse.com
2. Marketing pages are accessible
3. Login functionality works with test credentials:
   - Email: admin@talentpulse.com
   - Password: password123
4. Dashboard is accessible after login
5. Bilingual support works correctly

## Troubleshooting

### Common Issues:

1. **Login not working:**
   - Verify environment variables are set correctly
   - Check MongoDB connection string
   - Ensure NEXTAUTH_URL matches your actual domain

2. **Domain not connecting:**
   - Verify DNS settings are correct
   - Check for DNS propagation (can take up to 48 hours)
   - Ensure no conflicting DNS records exist

3. **Deployment fails:**
   - Check build logs in Vercel dashboard
   - Verify package.json has correct build scripts
   - Ensure all dependencies are properly installed

For additional support, contact Vercel support or refer to their documentation at https://vercel.com/docs.
