import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Janne Jannenen',
        url: 'https://www.yle.fi',
        likes: 0,
        user: '123'
    }
    const user = {
        username: 'testuser',
        name: 'tester',
        id: '123'
    }

    render(<Blog blog={blog} user={user} />)

    const element = screen.findByText('Component testing is done with react-testing-library')

    expect(element).toBeDefined()

})