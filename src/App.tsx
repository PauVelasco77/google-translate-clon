import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './consts'
import { ArrowsIcon } from './components/Icons'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages } = useStore()

  return (

    <Container fluid>
      <Row>
        <Col>
          <h2>From</h2>
          {fromLanguage}
        </Col>
        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages }><ArrowsIcon/></Button>
        </Col>
        <Col>
          <h2>To</h2>
          {toLanguage}
        </Col>
      </Row>
      <div>
        <h1>GOOGLE TRANSLATE</h1>
      </div>
    </Container>

  )
}

export default App
