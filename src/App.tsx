import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from './consts'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
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

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_LANGUAGES[toLanguage]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    console.log('useEffect', fromLanguage)
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText }).then((res) => {
      if (res == null) return
      setResult(res)
    }).catch((err) => {
      setResult('Error')
      throw new Error(err.message)
    }
    )
  }, [debouncedFromText, toLanguage])

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
              <div
                style={ { position: 'absolute', left: '0', bottom: '0', display: 'flex' } }

              >

                <Button
                  variant='link'
                  onClick={ handleClipboard }
                >
                  <ClipboardIcon/>
                </Button>
                <Button
                  variant='link'
                  onClick={ handleSpeak }
                >
                  <SpeakerIcon/>
                </Button>

              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>

  )
}

export default App
