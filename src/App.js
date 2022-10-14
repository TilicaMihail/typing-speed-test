import { useEffect, useRef, useState } from 'react';
import './App.css';
import { data } from './data';

function App() {
    const totalseconds = 30
    const [words, setWords] = useState([])
    const [wordsCorrect, setWordsCorrect] = useState([])
    const [inputIsFocused, setInputIsFocused] = useState(true)
    const [timeouts, setTimeouts] = useState([])
    const [correctWordsCount, setCorrectWordsCount] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [timerStarted, setTimerStarted] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(30)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [wordInput, setWordInput] = useState('')
    const inputRef = useRef();

    useEffect(() => {
        fetchWords()
        inputRef.current.focus();
    }, [])

    const fetchWords = () => {
        let a = []
        const length = data.getWordCount()
        for(let i = 0; i < 90; i++) {
            a.push(data.getWordAtPosition(Math.floor(Math.random() * (200))))
        }
        setWords(a)
    }

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
            setCorrectWordsCount(prev => prev + 1)
        } else {
            setWordsCorrect(words => [...words, false])
        }
        setCurrentWordIndex(prev => prev + 1)
    }

    const addInputChar = (e) => { 
        setWordInput(e.target.value)
        if(!timerStarted)
            startTimer()
    }
    
    const startTimer = () => {
        setTimerStarted(true)
        let a = []
        for(let i = 0; i < secondsLeft; i ++) {
            a.push(setTimeout(() => {setSecondsLeft(prev => prev - 1)}, [1000 * i]))
        }
        a.push(setTimeout(() => {finishTest()} , [1000 * secondsLeft]))
        setTimeouts(a)
    }

    const finishTest = () => {
        setModalOpen(true)
    }

    const reset = (e) => {
        timeouts.forEach((timeout) => clearTimeout(timeout))
        e?.stopPropagation()
        setWordInput('')
        setTimerStarted(false)
        setSecondsLeft(30)
        setCorrectWordsCount(0)
        setWordsCorrect([])
        setCurrentWordIndex(0)
        setInputIsFocused(true)
        setModalOpen(false)
        fetchWords()
        inputRef.current.focus();
    }

	return (
        <div className = 'w-full bg-gray-900 min-h-screen pl-20 pr-20 pt-10 pb-20' onClick = {removeFocus}>
            <div className = 'text-stone-300 font-bold text-4xl text-center'>
                Typing speed test
            </div>
            <input 
                type="text" 
                value = {wordInput} 
                onChange = {e => e.target.value[e.target.value.length - 1] === ' ' ? verifyWordIsCorrect() : addInputChar(e)} 
                className = 'h-0 w-0 p-0 m-0 outline-none border-none' ref = {inputRef} 
            />
            <div className = {'h-96 w-full bg-slate-800 rounded-xl text-stone-500 text-2xl p-10 tracking-wider relative ' + (!inputIsFocused && ' blur-sm')} onClick = {focusInput}>
                <div className = 'text-yellow-400 text-2xl'>
                    {secondsLeft}
                </div>
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
                                                {wordInput.length === i && <span className = 'w-[2px] h-[23px] bottom-0 bg-yellow-500 absolute rounded animate-pulse-fast duration-100'></span>}
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
            <div className = 'flex items-center justify-center text-stone-500 p-5 text-3xl  ' >
                <div className = 'hover:scale-105 cursor-pointer' onClick = {reset}>
                    <ion-icon name="reload-outline"></ion-icon>
                </div>
            </div>
            {
                modalOpen && 
                <div className = 'w-screen h-screen flex items-center justify-center fixed top-0 left-0' onClick = {reset}>
                    <div className = 'w-1/2 h-[400px] rounded-xl shadow-xl bg-gray-900 p-5 flex flex-col justify-between'>
                        <div>
                            <div className = 'text-center text-4xl font-bold text-stone-300'>
                                Your are {correctWordsCount * (60 / totalseconds) > 70 ? ' an eagle': correctWordsCount * (60 / totalseconds) > 50 ? ' a cheetah' : correctWordsCount * (60 / totalseconds) > 30 ? ' a rabit' : ' a turtle'}
                            </div>
                            <div className = 'flex items-center justify-center pt-4'>
                                <img className = 'h-52 w-52 rounded-4xl overflow-hidden object-cover rounded-full' src = {correctWordsCount * (60 / totalseconds) > 70 ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_eqq-0MJK5jo6jJwVODUU52i7Nyc-8jBaXz3XvitbZenFV_umUfMzCF0HQqCD62_Hfo&usqp=CAU': correctWordsCount * (60 / totalseconds) > 50 ? 'https://cdn.britannica.com/01/152301-050-1EF6EBB4/Cheetah.jpg' : correctWordsCount * (60 / totalseconds) > 30 ? 'https://i.pinimg.com/736x/90/d8/aa/90d8aa327abbc9375205fd7f348c2943.jpg' : 'https://patch.com/img/cdn20/users/22994611/20220630/012342/styles/patch_image/public/box-turtle-pb-002___30132141100.jpg'} alt = '' />
                            </div>
                        </div>
                        <div className = 'text-center text-2xl font-bold text-stone-300'>
                            You typed with a speed of {correctWordsCount * (60 / totalseconds)} wpm
                        </div> 
                    </div>
                </div>
            }
        </div>
	);
}

export default App;
