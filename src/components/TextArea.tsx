import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { type CSSProperties } from 'react'

interface Props {
  loading?: boolean
  value: string
  onChange: (value: string) => void
  type: SectionType
}

const commonStyles: CSSProperties = { border: 0, height: '200px', resize: 'none' }

export const TextArea: React.FC<Props> = ({ loading, value, onChange, type }) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Enter text to translate'
    if (loading === true) return 'Translating...'
    return 'Translation'
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={ type === SectionType.From }
      as='textarea'
      placeholder={ getPlaceholder({ type, loading }) }
      style={styles }
      value={ value }
      onChange={ handleChange }
    />
  )
}
