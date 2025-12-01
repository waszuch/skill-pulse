import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge multiple class names', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', false && 'conditional-class', 'always-class')
    expect(result).toContain('base-class')
    expect(result).toContain('always-class')
    expect(result).not.toContain('conditional-class')
  })

  it('should merge conflicting Tailwind classes correctly', () => {
    const result = cn('pl-4', 'pl-6')
    expect(result).toBe('pl-6')
  })

  it('should handle undefined and null values', () => {
    const result = cn('class-1', undefined, null, 'class-2')
    expect(result).toContain('class-1')
    expect(result).toContain('class-2')
  })

  it('should handle arrays of classes', () => {
    const result = cn(['class-1', 'class-2'], 'class-3')
    expect(result).toContain('class-1')
    expect(result).toContain('class-2')
    expect(result).toContain('class-3')
  })

  it('should return empty string when no arguments provided', () => {
    const result = cn()
    expect(result).toBe('')
  })
})

