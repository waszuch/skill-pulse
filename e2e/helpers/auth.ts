import { Page } from '@playwright/test'

export async function login(page: Page) {
  await page.goto('/sign-in')
  await page.waitForLoadState('networkidle')
}

export async function skipAuth(page: Page) {
  await page.goto('/dashboard')
}

