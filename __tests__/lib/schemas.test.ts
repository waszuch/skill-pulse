import { describe, it, expect } from 'vitest'
import { skillSchema, projectSchema } from '@/lib/schemas'

describe('skillSchema', () => {
  it('should validate correct skill data', () => {
    const validData = {
      name: 'React',
      level: 4,
      tags: ['frontend', 'javascript'],
    }
    
    const result = skillSchema.safeParse(validData)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validData)
    }
  })

  it('should reject skill without name', () => {
    const invalidData = {
      name: '',
      level: 3,
      tags: ['tag'],
    }
    
    const result = skillSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject skill with level below 1', () => {
    const invalidData = {
      name: 'Python',
      level: 0,
      tags: ['backend'],
    }
    
    const result = skillSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject skill with level above 5', () => {
    const invalidData = {
      name: 'TypeScript',
      level: 6,
      tags: ['frontend'],
    }
    
    const result = skillSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject skill with name longer than 50 characters', () => {
    const invalidData = {
      name: 'A'.repeat(51),
      level: 3,
      tags: ['tag'],
    }
    
    const result = skillSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject skill without tags', () => {
    const invalidData = {
      name: 'JavaScript',
      level: 4,
      tags: [],
    }
    
    const result = skillSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should accept skill at boundary levels (1 and 5)', () => {
    const dataLevel1 = {
      name: 'CSS',
      level: 1,
      tags: ['styling'],
    }
    const dataLevel5 = {
      name: 'HTML',
      level: 5,
      tags: ['markup'],
    }
    
    expect(skillSchema.safeParse(dataLevel1).success).toBe(true)
    expect(skillSchema.safeParse(dataLevel5).success).toBe(true)
  })
})

describe('projectSchema', () => {
  it('should validate correct project data with link', () => {
    const validData = {
      title: 'My Awesome Project',
      description: 'This is a great project',
      techStack: ['React', 'TypeScript', 'Node.js'],
      link: 'https://example.com',
    }
    
    const result = projectSchema.safeParse(validData)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validData)
    }
  })

  it('should validate correct project data without link', () => {
    const validData = {
      title: 'My Project',
      description: 'A project without a link',
      techStack: ['Vue', 'JavaScript'],
      link: '',
    }
    
    const result = projectSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should validate project data with missing optional link', () => {
    const validData = {
      title: 'My Project',
      description: 'A project',
      techStack: ['Angular'],
    }
    
    const result = projectSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject project without title', () => {
    const invalidData = {
      title: '',
      description: 'Description',
      techStack: ['React'],
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject project with title longer than 100 characters', () => {
    const invalidData = {
      title: 'A'.repeat(101),
      description: 'Description',
      techStack: ['React'],
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject project without description', () => {
    const invalidData = {
      title: 'Project',
      description: '',
      techStack: ['React'],
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject project with description longer than 1000 characters', () => {
    const invalidData = {
      title: 'Project',
      description: 'A'.repeat(1001),
      techStack: ['React'],
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject project with empty tech stack', () => {
    const invalidData = {
      title: 'Project',
      description: 'Description',
      techStack: [],
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject project with invalid URL', () => {
    const invalidData = {
      title: 'Project',
      description: 'Description',
      techStack: ['React'],
      link: 'not-a-valid-url',
    }
    
    const result = projectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should accept project with valid URL formats', () => {
    const urls = [
      'https://example.com',
      'http://example.com',
      'https://example.com/path',
      'https://subdomain.example.com',
      'https://example.com:3000',
    ]
    
    urls.forEach(url => {
      const data = {
        title: 'Project',
        description: 'Description',
        techStack: ['React'],
        link: url,
      }
      expect(projectSchema.safeParse(data).success).toBe(true)
    })
  })
})
