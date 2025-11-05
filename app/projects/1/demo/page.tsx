'use client';

import { useState, useEffect, useCallback } from 'react';

interface WordleResponse {
  id: number;
  solution: string;
  print_date: string;
  days_since_launch: number;
  editor: string;
}

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface Letter {
  char: string;
  state: LetterState;
}

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function WordleDemo() {
  const [wordleAnswer, setWordleAnswer] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch today's Wordle answer from NYT API via our proxy route
  useEffect(() => {
    const fetchWordleAnswer = async () => {
      try {
        const response = await fetch('/api/wordle');
        if (!response.ok) {
          throw new Error('Failed to fetch Wordle answer');
        }
        
        const data: WordleResponse = await response.json();
        setWordleAnswer(data.solution.toUpperCase());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Wordle answer:', err);
        setError('Failed to load today\'s Wordle. Please try again later.');
        setLoading(false);
      }
    };

    fetchWordleAnswer();
  }, []);

  // Check if a word is valid (for simplicity, we'll accept any 5-letter word)
  const isValidWord = (word: string): boolean => {
    return word.length === 5 && /^[A-Za-z]+$/.test(word);
  };

  // Calculate letter states for a guess
  const calculateLetterStates = (guess: string, answer: string): Letter[] => {
    const result: Letter[] = [];
    const answerArray = answer.split('');
    const guessArray = guess.toUpperCase().split('');
    const used = new Array(WORD_LENGTH).fill(false);

    // First pass: mark correct positions
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessArray[i] === answerArray[i]) {
        result.push({ char: guessArray[i], state: 'correct' });
        used[i] = true;
      } else {
        result.push({ char: '', state: 'empty' });
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i].state === 'empty') {
        const char = guessArray[i];
        const foundIndex = answerArray.findIndex(
          (letter, idx) => letter === char && !used[idx]
        );
        if (foundIndex !== -1) {
          result[i] = { char, state: 'present' };
          used[foundIndex] = true;
        } else {
          result[i] = { char, state: 'absent' };
        }
      }
    }

    return result;
  };

  // Handle guess submission
  const handleSubmitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH || !isValidWord(currentGuess)) {
      return;
    }

    if (gameState !== 'playing') {
      return;
    }

    const guess = currentGuess.toUpperCase();
    const letterStates = calculateLetterStates(guess, wordleAnswer);
    
    setGuesses((prev) => [...prev, letterStates]);
    setCurrentGuess('');

    // Check if won
    if (guess === wordleAnswer) {
      setGameState('won');
    } else if (guesses.length + 1 >= MAX_GUESSES) {
      setGameState('lost');
    }
  }, [currentGuess, wordleAnswer, gameState, guesses.length]);

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return;

    if (key === 'Enter') {
      handleSubmitGuess();
    } else if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }
  };

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Backspace' || /^[A-Za-z]$/i.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameState, wordleAnswer, guesses.length]);

  // Get state color for a letter
  const getStateColor = (state: LetterState): string => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-600 text-white dark:bg-gray-700';
      default:
        return 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600';
    }
  };

  // Render a row of letters
  const renderRow = (letters: Letter[], isCurrent: boolean = false) => {
    const row = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = letters[i] || { char: '', state: 'empty' as LetterState };
      const char = isCurrent && i < currentGuess.length 
        ? currentGuess[i] 
        : letter.char;
      
      row.push(
        <div
          key={i}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-xl rounded transition-all duration-200 ${
            getStateColor(letter.state)
          }`}
        >
          {char}
        </div>
      );
    }
    return row;
  };

  if (loading) {
    return (
      <div className="h-full min-h-[600px] bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading today's Wordle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-[600px] bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white dark:bg-black p-3 md:p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Try it out
        </h1>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-1 overflow-hidden">
          {/* Left Side: Wordle Game */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-800 overflow-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
              Wordle Game
            </h2>
            
            {/* Game Board */}
            <div className="flex flex-col items-center gap-1.5 mb-4">
              {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
                const row = guesses[rowIndex];
                const isCurrent = rowIndex === guesses.length && gameState === 'playing';
                return (
                  <div key={rowIndex} className="flex gap-1.5">
                    {renderRow(row || [], isCurrent)}
                  </div>
                );
              })}
            </div>

            {/* Keyboard */}
            <div className="mt-4">
              <div className="flex flex-col gap-1.5">
                {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    {row.split('').map((key) => {
                      // Find the state of this key from guesses
                      let keyState: LetterState = 'empty';
                      for (const guess of guesses) {
                        for (const letter of guess) {
                          if (letter.char === key) {
                            if (letter.state === 'correct') {
                              keyState = 'correct';
                            } else if (letter.state === 'present' && keyState !== 'correct') {
                              keyState = 'present';
                            } else if (letter.state === 'absent' && keyState === 'empty') {
                              keyState = 'absent';
                            }
                          }
                        }
                      }
                      
                      return (
                        <button
                          key={key}
                          onClick={() => handleKeyPress(key)}
                          className={`px-2 py-1.5 text-xs md:text-sm font-semibold rounded transition-colors ${
                            keyState === 'correct'
                              ? 'bg-green-500 text-white'
                              : keyState === 'present'
                              ? 'bg-yellow-500 text-white'
                              : keyState === 'absent'
                              ? 'bg-gray-600 text-white dark:bg-gray-700'
                              : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600'
                          }`}
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <div className="flex justify-center gap-1.5 mt-1.5">
                  <button
                    onClick={() => handleKeyPress('Enter')}
                    className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    ENTER
                  </button>
                  <button
                    onClick={() => handleKeyPress('Backspace')}
                    className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    ⌫
                  </button>
                </div>
              </div>
            </div>

            {/* Game Status */}
            {gameState === 'won' && (
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">
                  🎉 Congratulations! You won!
                </p>
              </div>
            )}
            {gameState === 'lost' && (
              <div className="mt-4 text-center">
                <p className="text-base font-bold text-red-600 dark:text-red-400 mb-1">
                  Game Over
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The word was: <span className="font-bold">{wordleAnswer}</span>
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Bot Suggestion */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-800 overflow-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
              Bot Suggestion
            </h2>
            
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 w-full">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                  Wordle Bot API
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Suggested word will appear here
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
                  (To be implemented)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

