import { test, expect } from '@playwright/test'

test.describe('Skills Flow (Auth Required)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skills', { waitUntil: 'domcontentloaded' })
  })

  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.waitForURL(/.*sign-in.*/, { timeout: 10000 })
    expect(page.url()).toContain('sign-in')
  })

  test.skip('should load skills page', async ({ page }) => {
    const pageContent = await page.content()
    const hasSkillsContent = pageContent.includes('skill') || 
                            pageContent.includes('Skill') ||
                            await page.locator('text=/skill/i').count() > 0
    
    expect(hasSkillsContent).toBeTruthy()
  })

  test.skip('should show add skill button or form', async ({ page }) => {
    const hasAddButton = await page.locator('button:has-text("Add")').count() > 0
    const hasAddLink = await page.locator('a:has-text("Add")').count() > 0
    const hasForm = await page.locator('form').count() > 0
    
    expect(hasAddButton || hasAddLink || hasForm).toBeTruthy()
  })

  test.skip('should display empty state or skills list', async ({ page }) => {
    const hasCards = await page.locator('[class*="card"]').count() > 0
    const hasEmptyState = await page.locator('text=/no skills/i').count() > 0
    const hasContent = await page.locator('text=/skill/i').count() > 0
    
    expect(hasCards || hasEmptyState || hasContent).toBeTruthy()
  })

  test.skip('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBeTruthy()
  })
})

test.describe('Skills - Add Skill Flow', () => {
  test.skip('should show skill form when add button clicked', async ({ page }) => {
    await page.goto('/skills', { waitUntil: 'domcontentloaded' })
    
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

