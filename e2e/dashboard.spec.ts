import { test, expect } from '@playwright/test'

test.describe('Dashboard (Auth Required)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' })
  })

  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.waitForURL(/.*sign-in.*/, { timeout: 10000 })
    expect(page.url()).toContain('sign-in')
  })

  test.skip('should load dashboard page', async ({ page }) => {
    const pageContent = await page.content()
    const hasDashboardContent = pageContent.includes('dashboard') || 
                                pageContent.includes('Dashboard') ||
                                await page.locator('text=/dashboard/i').count() > 0
    
    expect(hasDashboardContent).toBeTruthy()
  })

  test.skip('should display page content', async ({ page }) => {
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()
    expect(bodyText!.length).toBeGreaterThan(0)
  })

  test.skip('should have navigation elements', async ({ page }) => {
    const hasNav = await page.locator('nav').count() > 0
    const hasLinks = await page.locator('a').count() > 0
    
    expect(hasNav || hasLinks).toBeTruthy()
  })

  test.skip('should render without console errors', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('chunk') &&
      !err.includes('404')
    )
    
    expect(criticalErrors.length).toBe(0)
  })

  test.skip('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBeTruthy()
  })
})

