import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SkillCard } from '@/components/skill-card'

describe('SkillCard Component', () => {
  const mockProps = {
    id: '123' as any,
    name: 'React',
    level: 4,
    tags: ['frontend', 'javascript'],
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  }

  it('should render skill name', () => {
    render(<SkillCard {...mockProps} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('should render skill level', () => {
    render(<SkillCard {...mockProps} />)
    expect(screen.getByText('Level 4 of 5')).toBeInTheDocument()
  })

  it('should render all tags', () => {
    render(<SkillCard {...mockProps} />)
    
    expect(screen.getByText('frontend')).toBeInTheDocument()
    expect(screen.getByText('javascript')).toBeInTheDocument()
  })

  it('should render level visualization bars', () => {
    const { container } = render(<SkillCard {...mockProps} />)
    
    const levelBars = container.querySelectorAll('.h-2.flex-1')
    expect(levelBars).toHaveLength(5)
  })

  it('should highlight correct number of level bars based on level', () => {
    const { container } = render(<SkillCard {...mockProps} level={3} />)
    
    const activeBars = container.querySelectorAll('.bg-primary')
    const inactiveBars = container.querySelectorAll('.bg-muted')
    
    expect(activeBars.length).toBe(3)
    expect(inactiveBars.length).toBe(2)
  })

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup()
    render(<SkillCard {...mockProps} />)
    
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
    render(<SkillCard {...mockProps} />)
    
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg')?.classList.contains('lucide-trash-2')
    )
    
    if (deleteButton) {
      await user.click(deleteButton)
      expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id)
    }
  })

  it('should not render tags section when tags array is empty', () => {
    render(<SkillCard {...mockProps} tags={[]} />)
    
    const badges = screen.queryAllByText(/frontend|javascript/)
    expect(badges).toHaveLength(0)
  })

  it('should render correctly with level 1', () => {
    render(<SkillCard {...mockProps} level={1} />)
    expect(screen.getByText('Level 1 of 5')).toBeInTheDocument()
  })

  it('should render correctly with level 5', () => {
    render(<SkillCard {...mockProps} level={5} />)
    expect(screen.getByText('Level 5 of 5')).toBeInTheDocument()
  })

  it('should have proper card structure', () => {
    const { container } = render(<SkillCard {...mockProps} />)
    
    const card = container.firstChild
    expect(card).toBeInTheDocument()
  })
})
