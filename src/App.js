import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    const [words, setWords] = useState([
        "the",
        "of",
        "and",
        "to",
        "a",
        "in",
        "for",
        "is",
        "on",
        "that",
        "by",
        "this",
        "with",
        "i",
        "you",
        "it",
        "not",
        "or",
        "be",
        "are",
        "from",
        "at",
        "as",
        "your",
        "all",
        "have",
        "new",
        "more",
        "an",
        "was",
        "we",
        "will",
        "home",
        "can",
        "us",
        "about",
        "if",
        "page",
        "my",
        "has",
        "search",
        "free",
        "but",
        "our",
        "one",
        "other",
        "do",
        "no",
        "information",
        "time",
        "they",
        "site",
        "he",
        "up",
        "may",
        "what",
        "which",
        "their",
        "news",
        "out",
        "use",
        "any",
        "there",
        "see",
        "only",
        "so",
        "his",
        "when",
        "contact",
        "here",
        "business",
        "who",
        "web",
        "also",
        "now",
        "help",
        "get",
        "pm",
        "view",
        "online",
        "first",
        "am"
    ])
    const [wordsCorrect, setWordsCorrect] = useState([])
    const [inputIsFocused, setInputIsFocused] = useState(true)
    const [correctWordsCount, setCorrectWordsCount] = useState(0)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [wordInput, setWordInput] = useState('')
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const focusInput = (e) => {
        e.stopPropagation()
        setInputIsFocused(true)
        inputRef.current.focus();
    }

    const removeFocus = () => {
        setInputIsFocused(false)
        inputRef.current.blur();
    }

    const verifyWordIsCorrect = () => {
        setWordInput('')
        
        if(wordInput === words[currentWordIndex]) {
            setWordsCorrect(words => [...words, true])
        } else {
            setWordsCorrect(words => [...words, false])
        }
        setCurrentWordIndex(prev => prev + 1)
    }

	return (
        <div className = 'w-full bg-gray-900 min-h-screen pl-20 pr-20 pt-10 pb-20' onClick = {removeFocus}>
            <div className = 'text-stone-300 font-bold text-4xl text-center'>
                Typing speed test
            </div>
            <input 
                type="text" 
                value = {wordInput} 
                onChange = {e => e.target.value[e.target.value.length - 1] === ' ' ? verifyWordIsCorrect() : setWordInput(e.target.value)} 
                className = 'h-0 w-0 p-0 m-0 outline-none border-none' ref = {inputRef} 
            />
            <div className = {'h-96 w-full bg-slate-800 rounded-xl text-stone-500 text-2xl p-10 tracking-wider relative ' + (!inputIsFocused && ' blur-sm')} onClick = {focusInput}>
                {words.map((word, index) => {
                    if(wordsCorrect[index] === true)
                        return (
                            <span key = {index} className = 'text-green-300'>{word + ' '}</span>
                        )
                    else if(wordsCorrect[index] === false) 
                        return (
                            <span key = {index} className = 'text-red-500'>{word + ' '}</span>
                        ) 
                    else if(index === currentWordIndex)
                        return (
                            <span key = {index}>
                                {   
                                    (word + wordInput.slice(word.length) + ' ').split('').map((letter, i) => {
                                        return (
                                            <span 
                                                key = {i}  
                                                className = {
                                                    (wordInput[i] && wordInput[i] === word[i]) ? 
                                                        'text-green-300 relative' : 
                                                    (wordInput[i]) ? 
                                                        'text-red-500 relative' : 
                                                    'relative'
                                                }
                                            >
                                                {wordInput.length === i && <span className = 'w-[1px] h-[23px] bottom-0 bg-yellow-500 absolute'></span>}
                                                {letter}
                                            </span>
                                        )
                                    }) 
                                }
                            </span>
                        )
                    else 
                        return (
                            <span key = {index}>
                                {     
                                    word + ' '
                                }
                            </span>
                        )       
                })}
            </div>
        </div>
	);
}

export default App;
