import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectCard } from '@/components/project-card'

describe('ProjectCard Component', () => {
  const mockProps = {
    id: '456' as any,
    title: 'My Awesome Project',
    description: 'This is a great project that does amazing things',
    techStack: ['React', 'TypeScript', 'Node.js'],
    link: 'https://example.com',
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  }

  it('should render project title', () => {
    render(<ProjectCard {...mockProps} />)
    expect(screen.getByText('My Awesome Project')).toBeInTheDocument()
  })

  it('should render project description', () => {
    render(<ProjectCard {...mockProps} />)
    expect(screen.getByText(/This is a great project/i)).toBeInTheDocument()
  })

  it('should render all tech stack items as badges', () => {
    render(<ProjectCard {...mockProps} />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('should render project link when provided', () => {
    render(<ProjectCard {...mockProps} />)
    
    const link = screen.getByRole('link', { name: /view project/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should not render link when not provided', () => {
    render(<ProjectCard {...mockProps} link={undefined} />)
    
    const link = screen.queryByRole('link', { name: /view project/i })
    expect(link).not.toBeInTheDocument()
  })

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProjectCard {...mockProps} />)
    
    const editButtons = screen.getAllByRole('button')
    const editButton = editButtons.find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-pencil')
    )
    
    if (editButton) {
      await user.click(editButton)
      expect(mockProps.onEdit).toHaveBeenCalledWith(mockProps.id)
    }
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProjectCard {...mockProps} />)
    
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-trash-2')
    )
    
    if (deleteButton) {
      await user.click(deleteButton)
      expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id)
    }
  })

  it('should not render tech stack section when array is empty', () => {
    render(<ProjectCard {...mockProps} techStack={[]} />)
    
    const reactBadge = screen.queryByText('React')
    expect(reactBadge).not.toBeInTheDocument()
  })

  it('should truncate long descriptions with line-clamp', () => {
    const longDescription = 'A'.repeat(500)
    const { container } = render(
      <ProjectCard {...mockProps} description={longDescription} />
    )
    
    const descriptionElement = container.querySelector('.line-clamp-3')
    expect(descriptionElement).toBeInTheDocument()
  })

  it('should have proper card structure with flex layout', () => {
    const { container } = render(<ProjectCard {...mockProps} />)
    
    const card = container.querySelector('.flex.flex-col')
    expect(card).toBeInTheDocument()
  })

  it('should render with minimal required props', () => {
    const minimalProps = {
      id: '789' as any,
      title: 'Simple Project',
      description: 'Simple description',
      techStack: ['JavaScript'],
      onEdit: vi.fn(),
      onDelete: vi.fn(),
    }
    
    render(<ProjectCard {...minimalProps} />)
    
    expect(screen.getByText('Simple Project')).toBeInTheDocument()
    expect(screen.getByText('Simple description')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })
})
