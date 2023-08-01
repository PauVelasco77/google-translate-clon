import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './consts'
import { ArrowsIcon, ClipboardIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const { loading, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, fromText, result, setFromText, setResult } = useStore()

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch((err) => { throw new Error(err.message) })
  }

  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText }).then((res) => {
      if (res == null) return
      setResult(res)
    }).catch((err) => {
      setResult('Error')
      throw new Error(err.message)
    }
    )
  }, [debouncedFromText, fromLanguage])

  return (

    <Container fluid>
      <div>
        <h2>GOOGLE TRANSLATE</h2>
      </div>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={ setFromLanguage }
              type={ SectionType.From}
              value={ fromLanguage }
            />
            <TextArea
              type={ SectionType.From }
              value={ fromText }
              onChange={ setFromText }
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages }><ArrowsIcon/></Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={ setToLanguage }
              type={ SectionType.To}
              value={ toLanguage }
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={ SectionType.To }
                loading={ loading}
                value={ result}
                onChange={ setResult }
              />
              <Button
                variant='link'
                onClick={ handleClipboard }
                style={ { position: 'absolute', left: '0', bottom: '0' } }
              >
                <ClipboardIcon/>
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>

  )
}

export default App
