import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Manage Your Skills & Projects')
  })

  test('should display all features', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('text=Skill Management')).toBeVisible()
    await expect(page.locator('text=Project Portfolio')).toBeVisible()
    await expect(page.locator('text=Visual Dashboard')).toBeVisible()
    await expect(page.locator('text=Secure Authentication')).toBeVisible()
    await expect(page.locator('text=Real-time Sync')).toBeVisible()
    await expect(page.locator('text=Modern UI')).toBeVisible()
  })

  test('should navigate to sign-up page', async ({ page }) => {
    await page.goto('/')
    
    const getStartedButton = page.locator('a:has-text("Get Started Free")').first()
    await getStartedButton.click()
    
    await expect(page).toHaveURL(/.*sign-up/)
  })

  test('should navigate to features section on learn more click', async ({ page }) => {
    await page.goto('/')
    
    const learnMoreButton = page.locator('a:has-text("Learn More")').first()
    await learnMoreButton.click()
    
    await expect(page).toHaveURL('/#features')
  })

  test('should display technology stack badges', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('[data-slot="badge"]:has-text("Next.js 15")')).toBeVisible()
    await expect(page.locator('[data-slot="badge"]:has-text("React 19")')).toBeVisible()
    await expect(page.locator('[data-slot="badge"]:has-text("TypeScript")')).toBeVisible()
    await expect(page.locator('[data-slot="badge"]:has-text("Convex")')).toBeVisible()
    await expect(page.locator('[data-slot="badge"]:has-text("Clerk")')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Get Started Free')).toBeVisible()
  })
})

