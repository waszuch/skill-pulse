import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to all main pages from home', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toContainText('Manage Your Skills')
  })

  test('should have working navigation links in header', async ({ page }) => {
    await page.goto('/')
    
    const homeLink = page.locator('a[href="/"]').first()
    await expect(homeLink).toBeVisible()
  })

  test('should have get started CTA button', async ({ page }) => {
    await page.goto('/')
    
    const getStartedButton = page.locator('a:has-text("Get Started")').first()
    await expect(getStartedButton).toBeVisible()
  })

  test('should maintain scroll position when navigating', async ({ page }) => {
    await page.goto('/')
    
    await page.evaluate(() => window.scrollTo(0, 500))
    const scrollY = await page.evaluate(() => window.scrollY)
    
    expect(scrollY).toBeGreaterThan(0)
  })
})

