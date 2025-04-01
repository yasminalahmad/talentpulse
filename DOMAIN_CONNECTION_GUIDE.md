# Domain Connection Guide for TalentPulse AI

This guide provides detailed instructions for connecting your custom domain (talentpulse.com) to your Vercel-deployed TalentPulse AI application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Adding Your Domain in Vercel](#adding-your-domain-in-vercel)
3. [DNS Configuration Options](#dns-configuration-options)
4. [SSL Certificate Setup](#ssl-certificate-setup)
5. [Verifying Domain Connection](#verifying-domain-connection)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:
- Access to your domain registrar account for talentpulse.com
- Admin access to your Vercel project
- Successfully deployed the TalentPulse AI application to Vercel

## Adding Your Domain in Vercel

1. Log in to your Vercel dashboard at https://vercel.com/dashboard
2. Select your TalentPulse AI project
3. Navigate to "Settings" > "Domains"
4. In the "Domains" section, enter "talentpulse.com" in the input field
5. Click "Add"
6. Vercel will provide you with DNS configuration options

## DNS Configuration Options

You have two options for configuring your DNS:

### Option 1: Using Vercel as your nameserver (Recommended)

This option provides the simplest setup and allows Vercel to manage all DNS records.

1. Log in to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains)
2. Find the nameserver settings for talentpulse.com
3. Replace the current nameservers with Vercel's nameservers:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
4. Save the changes

Note: Nameserver changes can take 24-48 hours to fully propagate across the internet.

### Option 2: Using A and CNAME records

If you prefer to keep your current nameservers and DNS provider:

1. Log in to your DNS provider
2. Add the following A record:
   - Type: A
   - Name: @ (or leave blank, representing the root domain)
   - Value: 76.76.21.21
   - TTL: 3600 (or automatic)

3. Add the following CNAME record for the www subdomain:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
   - TTL: 3600 (or automatic)

## SSL Certificate Setup

Vercel automatically provisions and renews SSL certificates for your domain. Once your DNS is properly configured:

1. Return to your Vercel project's "Domains" settings
2. Vercel will show the status of your domain verification
3. Once verified, Vercel will automatically issue an SSL certificate
4. The process typically takes 5-15 minutes after DNS verification

## Verifying Domain Connection

To verify your domain is properly connected:

1. Wait for DNS changes to propagate (can take up to 48 hours, but often much faster)
2. Visit https://talentpulse.com in your browser
3. Verify the site loads correctly with a secure HTTPS connection
4. Check that the TalentPulse AI application is functioning properly
5. Test the login functionality with the demo credentials

## Troubleshooting

### Common Issues:

1. **Domain shows "Invalid Configuration"**
   - Verify your DNS settings match exactly what Vercel recommends
   - Check if there are conflicting DNS records
   - Wait longer for DNS propagation (up to 48 hours)

2. **SSL Certificate Issues**
   - Ensure domain verification is complete
   - Check for CAA records that might restrict certificate issuance
   - Contact Vercel support if certificate issuance fails after 24 hours

3. **Domain Connects but Application Doesn't Work**
   - Verify environment variables are correctly set in Vercel
   - Check build logs for any deployment errors
   - Ensure NEXTAUTH_URL is set to your custom domain

4. **www Subdomain Not Working**
   - Verify the CNAME record is correctly set up
   - Check if you need to add www.talentpulse.com as a separate domain in Vercel

For additional assistance, contact Vercel support or refer to their documentation at https://vercel.com/docs/concepts/projects/domains.
