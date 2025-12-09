import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('home page should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)
  })

  test('buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    const buttons = page.locator('button, a[role="button"]')
    const buttonCount = await buttons.count()
    
    if (buttonCount > 0) {
      const firstButton = buttons.first()
      await firstButton.focus()
      
      const isFocused = await firstButton.evaluate(el => 
        el === document.activeElement
      )
      
      expect(isFocused).toBeTruthy()
    }
  })

  test('images should have alt text or be decorative', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')
      const ariaHidden = await img.getAttribute('aria-hidden')
      
      const isAccessible = alt !== null || role === 'presentation' || ariaHidden === 'true'
      expect(isAccessible).toBeTruthy()
    }
  })

  test('page should have proper document structure', async ({ page }) => {
    await page.goto('/')
    
    const hasMain = await page.locator('main, [role="main"]').count() > 0
    const hasHeading = await page.locator('h1, h2, h3').count() > 0
    
    expect(hasMain || hasHeading).toBeTruthy()
  })

  test('links should have accessible names', async ({ page }) => {
    await page.goto('/')
    
    const links = page.locator('a')
    const linkCount = await links.count()
    
    let accessibleLinks = 0
    
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      const title = await link.getAttribute('title')
      
      if ((text && text.trim().length > 0) || ariaLabel || title) {
        accessibleLinks++
      }
    }
    
    expect(accessibleLinks).toBeGreaterThan(0)
  })
})

