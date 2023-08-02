import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./services/translate', () => ({
  translate: async () => 'Hello World'
}))

describe('App', () => {
  it('should work', async () => {
    const user = userEvent.setup()
    const app = render(<App />)

    const textareaFrom = app.getByPlaceholderText('Enter text to translate')

    await user.type(textareaFrom, 'Hola Mundo')

    const result = await app.findByDisplayValue(/Hello World/i, {}, { timeout: 5000 })

    expect(result).toBeTruthy()
  })
})
