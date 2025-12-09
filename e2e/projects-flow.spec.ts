import { test, expect } from '@playwright/test'

test.describe('Projects Flow (Auth Required)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'domcontentloaded' })
  })

  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.waitForURL(/.*sign-in.*/, { timeout: 10000 })
    expect(page.url()).toContain('sign-in')
  })

  test.skip('should load projects page', async ({ page }) => {
    const pageContent = await page.content()
    const hasProjectsContent = pageContent.includes('project') || 
                               pageContent.includes('Project') ||
                               await page.locator('text=/project/i').count() > 0
    
    expect(hasProjectsContent).toBeTruthy()
  })

  test.skip('should show add project button or form', async ({ page }) => {
    const hasAddButton = await page.locator('button:has-text("Add")').count() > 0
    const hasAddLink = await page.locator('a:has-text("Add")').count() > 0
    const hasForm = await page.locator('form').count() > 0
    
    expect(hasAddButton || hasAddLink || hasForm).toBeTruthy()
  })

  test.skip('should display empty state or projects list', async ({ page }) => {
    const hasCards = await page.locator('[class*="card"]').count() > 0
    const hasEmptyState = await page.locator('text=/no projects/i').count() > 0
    const hasContent = await page.locator('text=/project/i').count() > 0
    
    expect(hasCards || hasEmptyState || hasContent).toBeTruthy()
  })

  test.skip('should render project cards with required elements', async ({ page }) => {
    const cards = page.locator('[class*="card"]')
    const cardCount = await cards.count()
    
    if (cardCount > 0) {
      const firstCard = cards.first()
      const hasContent = await firstCard.textContent()
      expect(hasContent).toBeTruthy()
      expect(hasContent!.length).toBeGreaterThan(0)
    }
  })

  test.skip('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBeTruthy()
  })
})

test.describe('Projects - Add Project Flow', () => {
  test.skip('should show project form when add button clicked', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'domcontentloaded' })
    
    const addButton = page.locator('button:has-text("Add")').or(page.locator('a:has-text("Add")')).first()
    
    if (await addButton.count() > 0) {
      await addButton.click()
      await page.waitForTimeout(500)
      
      const formVisible = await page.locator('form').count() > 0 || 
                         await page.locator('input').count() > 0 ||
                         await page.locator('dialog').count() > 0
      
      expect(formVisible).toBeTruthy()
    }
  })
})

