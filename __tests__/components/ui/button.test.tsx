import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render with default variant', () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button.className).toContain('bg-primary')
  })

  it('should render with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    
    expect(button.className).toContain('bg-destructive')
  })

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    
    expect(button.className).toContain('border')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button')
    expect(button.className).toContain('h-8')
    
    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('h-10')
  })

  it('should be disabled when disabled prop is true', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    
    expect(button.className).toContain('custom-class')
  })

  it('should handle type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should have proper accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Click</Button>)
    const button = screen.getByRole('button', { name: /accessible button/i })
    
    expect(button).toBeInTheDocument()
  })
})
