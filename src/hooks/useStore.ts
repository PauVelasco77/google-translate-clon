import { useReducer } from 'react'
import { type FromLanguage, type Action, type State, type ToLanguage } from '../types'
import { AUTO_LANGUAGE } from '../consts'

export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

export function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES': {
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      const newState = {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
      return newState
    }
    case 'SET_FROM_LANGUAGE' : {
      const newState = {
        ...state,
        fromLanguage: action.payload
      }
      return newState
    }
    case 'SET_TO_LANGUAGE': {
      const newState = {
        ...state,
        toLanguage: action.payload
      }
      return newState
    }
    case 'SET_FROM_TEXT': {
      const newState = {
        ...state,
        loading: true,
        fromText: action.payload
      }
      return newState
    }
    case 'SET_RESULT': {
      const newState = {
        ...state,
        loading: false,
        result: action.payload
      }
      return newState
    }

    default: return state
  }
}

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => { dispatch({ type: 'INTERCHANGE_LANGUAGES' }) }

  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }

  const setToLanguage = (payload: ToLanguage) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }

  const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload }) }

  const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
