import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './consts'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App () {
  const { loading, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, fromText, result, setFromText, setResult } = useStore()

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
            <TextArea
              type={ SectionType.To }
              loading={ loading}
              value={ result}
              onChange={ setResult }
            />
          </Stack>
        </Col>
      </Row>
    </Container>

  )
}

export default App
