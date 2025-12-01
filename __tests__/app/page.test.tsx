import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('should render main heading', () => {
    render(<Home />)
    
    expect(screen.getByText(/Manage Your Skills & Projects/i)).toBeInTheDocument()
    expect(screen.getByText(/All in One Place/i)).toBeInTheDocument()
  })

  it('should render hero description', () => {
    render(<Home />)
    
    expect(screen.getByText(/SkillPulse helps developers track their technical skills/i)).toBeInTheDocument()
  })

  it('should render CTA buttons in hero section', () => {
    render(<Home />)
    
    const getStartedButton = screen.getByRole('link', { name: /get started free/i })
    const learnMoreButton = screen.getByRole('link', { name: /learn more/i })
    
    expect(getStartedButton).toBeInTheDocument()
    expect(learnMoreButton).toBeInTheDocument()
    
    expect(getStartedButton).toHaveAttribute('href', '/sign-up')
    expect(learnMoreButton).toHaveAttribute('href', '#features')
  })

  it('should render "Built for Developers" badge', () => {
    render(<Home />)
    
    expect(screen.getByText(/Built for Developers/i)).toBeInTheDocument()
  })

  it('should render features section', () => {
    render(<Home />)
    
    expect(screen.getByText(/Everything You Need/i)).toBeInTheDocument()
    
    expect(screen.getByText('Skill Management')).toBeInTheDocument()
    expect(screen.getByText('Project Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Visual Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Secure Authentication')).toBeInTheDocument()
    expect(screen.getByText('Real-time Sync')).toBeInTheDocument()
    expect(screen.getByText('Modern UI')).toBeInTheDocument()
  })

  it('should render feature descriptions', () => {
    render(<Home />)
    
    expect(screen.getByText(/Track your technical skills with customizable levels/i)).toBeInTheDocument()
    expect(screen.getByText(/Showcase your projects with descriptions/i)).toBeInTheDocument()
    expect(screen.getByText(/Visualize your skill distribution/i)).toBeInTheDocument()
  })

  it('should render technology stack section', () => {
    render(<Home />)
    
    expect(screen.getByText(/Built with Modern Tech/i)).toBeInTheDocument()
    
    expect(screen.getByText('Next.js 15')).toBeInTheDocument()
    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
    expect(screen.getByText('shadcn/ui')).toBeInTheDocument()
    expect(screen.getByText('Convex')).toBeInTheDocument()
    expect(screen.getByText('Clerk')).toBeInTheDocument()
    expect(screen.getByText('TanStack Form')).toBeInTheDocument()
    expect(screen.getByText('Zod')).toBeInTheDocument()
    expect(screen.getByText('Recharts')).toBeInTheDocument()
  })

  it('should render final CTA section', () => {
    render(<Home />)
    
    expect(screen.getByText(/Ready to Level Up?/i)).toBeInTheDocument()
    expect(screen.getByText(/Join developers who are already tracking their skills/i)).toBeInTheDocument()
    
    const ctaButton = screen.getByRole('link', { name: /start your journey/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/sign-up')
  })

  it('should have proper section structure', () => {
    const { container } = render(<Home />)
    
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(4)
  })

  it('should render emojis in feature cards', () => {
    render(<Home />)
    
    const { container } = render(<Home />)
    expect(container.textContent).toContain('📚')
    expect(container.textContent).toContain('🚀')
    expect(container.textContent).toContain('📊')
    expect(container.textContent).toContain('🔐')
    expect(container.textContent).toContain('⚡')
    expect(container.textContent).toContain('🎨')
  })

  it('should have features section with proper id for anchor linking', () => {
    const { container } = render(<Home />)
    
    const featuresSection = container.querySelector('#features')
    expect(featuresSection).toBeInTheDocument()
  })

  it('should have about section with proper id', () => {
    const { container } = render(<Home />)
    
    const aboutSection = container.querySelector('#about')
    expect(aboutSection).toBeInTheDocument()
  })
})
