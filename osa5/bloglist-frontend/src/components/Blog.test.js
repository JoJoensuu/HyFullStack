import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('clicking button shows url, likes and user', async () => {
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

    const { container } = render(
        <Blog blog={blog} user={user}/>
    )
    const div = container.querySelector('.hiddeninfo')
    expect(div).toHaveStyle('display: none')

    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    await testUser.click(button)

    expect(div).toHaveStyle('display: inline')
})

test('clicking like twice calls eventhandler twice', async () => {
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

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={user} addLike={mockHandler}/>
    )

    const testUser = userEvent.setup()
    const button = screen.getByText('like')
    await testUser.click(button)
    await testUser.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})