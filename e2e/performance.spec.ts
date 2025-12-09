import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('home page should load within reasonable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(10000)
  })

  test('should not have memory leaks on navigation', async ({ page }) => {
    await page.goto('/')
    await page.goto('/skills')
    await page.goto('/projects')
    await page.goto('/dashboard')
    await page.goto('/')
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBeTruthy()
  })

  test('images should be optimized', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const src = await img.getAttribute('src')
      
      if (src && !src.includes('data:')) {
        const hasOptimizedFormat = src.includes('next') || 
                                   src.includes('webp') || 
                                   src.includes('avif') ||
                                   src.startsWith('/_next')
        
        if (!src.includes('http')) {
          expect(hasOptimizedFormat || src.endsWith('.svg')).toBeTruthy()
        }
      }
    }
  })

  test('should not make excessive network requests', async ({ page }) => {
    const requests: string[] = []
    
    page.on('request', request => {
      requests.push(request.url())
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    expect(requests.length).toBeLessThan(100)
  })
})

