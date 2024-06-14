import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Button, TextField } from '@mui/material';

export default function Question() {
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

    const add = () => {
        setQuestions(prevQuestions => [...prevQuestions, { question: '', answer: '' }]);
    }

    const remove = (index) => {
        setQuestions(prevQuestions => prevQuestions.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setQuestions(prevQuestions => prevQuestions.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <ul>
            {
                questions.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <TextField
                                label={'Вопрос'}
                                value={item.question}
                                onChange={(e) => update(index, e.target.value, 'question')}
                            />
                            {index === 0 ? (
                                <Button onClick={add}>
                                    <AddIcon />
                                </Button>
                            ) : (
                                <Button onClick={() => remove(index)}>
                                    <RemoveIcon />
                                </Button>
                            )}
                        </div>

                        <div className="biography__input">
                            <TextField
                                label={'Ответ'}
                                value={item.answer}
                                onChange={(e) => update(index, e.target.value, 'answer')}
                            />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
