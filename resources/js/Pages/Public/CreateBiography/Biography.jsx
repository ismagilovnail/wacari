import './biography.scss';
import 'react-tooltip/dist/react-tooltip.css';

import NamePage from "@/Components/name-page/NamePage";
import Layout from "@/Layouts/Layout";
import {useState} from 'react';
import {Tooltip} from 'react-tooltip'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FormControl, MenuItem, Select, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import "dayjs/locale/ru";
import ImageCropper from '@/Components/ImageCropper/ImageCropper';
import Editor from '@/Components/editor/Editor';

import Question from '@/Components/form-biography/Question';
import Battles from '@/Components/form-biography/Battles';
import Army from '@/Components/form-biography/ArmyAwards';
import Rank from '@/Components/form-biography/Rank';
import TypeArmy from '@/Components/form-biography/TypeArmy';
import SocialLink from '@/Components/form-biography/SocialLink';
import Education from '@/Components/form-biography/Education';
import Company from '@/Components/form-biography/Company';
import InputAdd from '@/Components/form-biography/InputAdd';
import Citizenship from '@/Components/form-biography/Citizenship';
import Residence from '@/Components/form-biography/Residense';
import Spouse from '@/Components/form-biography/Spouse';
import Children from '@/Components/form-biography/Children';
import Input from '@/Components/form-biography/Input';

const CustomTabPanel = (props) => {
    const {children, value, index} = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    )
}

export default function BiographyCreate({continent, country, tips}) {
    const [buttonActive, setButtonActive] = useState(1);
    const [line, setLine] = useState('33.3%')

    const handleChange = (event) => {
        const value = parseInt(event.target.value);

        setButtonActive(value);

        if (value === 1) {
            setTimeout(() => {
                setLine('33.3%');
            }, 100);
        } else if (value === 2) {
            setTimeout(() => {
                setLine('66.6%');
            }, 100);
        } else {
            setTimeout(() => {
                setLine('100%');
            }, 100);
        }
    }

    return (
        <Layout>
            <section className="biography">
                <NamePage name={'Создание биографии'}/>

                <div className="biography_wrap">
                    <div className="biography_position">
                        <div className="biography_position__line"><span style={{width: line}}></span></div>
                        <div className="biography_position__step">
                            <button value={1} className={buttonActive === 1 ? 'active' : ''} onClick={handleChange}
                                    type="button">Шаг 1
                            </button>
                            <button value={2} className={buttonActive === 2 ? 'active' : ''} onClick={handleChange}
                                    type="button">Шаг 2
                            </button>
                            <button value={3} className={buttonActive === 3 ? 'active' : ''} onClick={handleChange}
                                    type="button">Шаг 3
                            </button>
                        </div>
                    </div>
                </div>

                <form>
                    <CustomTabPanel value={buttonActive} index={1}>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Основная биография
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="biography__block">
                                    <ul>
                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Полное имя <span>*</span>
                                                </p>
                                                <a id={`not-${tips[0]?.slug}`}><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect={`#not-${tips[0]?.slug}`}>
                                                    {tips[0]?.description}
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Фамилия'}
                                                />

                                                <TextField
                                                    label={'Имя'}
                                                />

                                                <TextField
                                                    label={'Отчество'}
                                                />
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Место рождение <span>*</span>
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select


                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select

                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select

                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Дата рождения <span>*</span>
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className='date'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Дата рождения'}
                                                            defaultValue={null}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>

                                        <Input name={'Прозвища'}/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Дата смерти
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className='date'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Дата смерти'}
                                                            defaultValue={null}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Место смерти
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select

                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select


                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select

                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </li>

                                        <Input name={'Причина смерти'}/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Похоронен
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select


                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select


                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl>
                                                    <InputLabel> Выбрать континент</InputLabel>
                                                    <Select

                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </li>
                                        <Citizenship/>
                                        <Residence/>
                                        <Input name={'Рост'}/>
                                        <Input name={'Вес'}/>
                                        <Spouse/>
                                        <Children/>


                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Отец
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className="biography__input-wrap">
                                                    <TextField
                                                        label={'Фамилия'}
                                                    />

                                                    <TextField
                                                        label={'Имя'}
                                                    />

                                                    <TextField
                                                        label={'Отчество'}
                                                    />

                                                    <div className="date">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                              adapterLocale={'ru'}>
                                                            <DatePicker
                                                                label={'Дата рождения'}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select


                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select


                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select

                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Мать
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <div className="biography__input-wrap">
                                                    <TextField
                                                        label={'Фамилия'}
                                                    />

                                                    <TextField
                                                        label={'Имя'}
                                                    />

                                                    <TextField
                                                        label={'Отчество'}
                                                    />

                                                    <div className="date">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                              adapterLocale={'ru'}>
                                                            <DatePicker
                                                                label={'Дата рождения'}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select

                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select


                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <InputLabel> Выбрать континент</InputLabel>
                                                        <Select

                                                        >
                                                            <MenuItem>Первый</MenuItem>
                                                            <MenuItem>Второй</MenuItem>
                                                            <MenuItem>Третий</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Отношения к религии
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">

                                                <FormControl>
                                                    <InputLabel> Отношения к религии</InputLabel>
                                                    <Select


                                                    >
                                                        <MenuItem>Первый</MenuItem>
                                                        <MenuItem>Второй</MenuItem>
                                                        <MenuItem>Третий</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </li>

                                        <Input name={'Хобби'}/>
                                        <Input name={'С каким животным ассоциируешься?'}/>

                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Образование и карьера
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="biography__block">
                                    <ul>


                                        <Education/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Ученная степень
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Ученная степень'}
                                                />

                                                <div className="date">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год'}
                                                            views={['year']}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>


                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Профессия
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Профессия'}
                                                />
                                            </div>
                                        </li>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Деятельность
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Деятельность'}
                                                />
                                            </div>
                                        </li>

                                        <Company/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Состояние
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Состояние'}
                                                />
                                            </div>
                                        </li>

                                        <InputAdd name={'Награды'}/>

                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Цитаты
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">
                                                <TextField
                                                    label={'Цитаты'}
                                                />
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Ссылки
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="biography__block">
                                    <ul>
                                        <SocialLink name={'Сайт'}/>
                                        <SocialLink name={'Телеграмм'}/>
                                        <SocialLink name={'YouTube'}/>
                                        <SocialLink name={'Одноклассники'}/>
                                        <SocialLink name={'Вконтакте'}/>
                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Военная служба
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="biography__block">
                                    <ul>
                                        <TypeArmy/>
                                        <li>
                                            <div className="biography__name">
                                                <p>
                                                    Годы службы
                                                </p>
                                                <a className="my-anchor-element"><HelpOutlineRoundedIcon/></a>
                                                <Tooltip anchorSelect=".my-anchor-element">
                                                    :(
                                                </Tooltip>
                                            </div>

                                            <div className="biography__input">

                                                <div className="date">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год с'}
                                                            views={['year']}
                                                        />
                                                    </LocalizationProvider>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                                                          adapterLocale={'ru'}>
                                                        <DatePicker
                                                            label={'Год до'}
                                                            views={['year']}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </li>
                                        <Rank/>
                                        <Battles/>
                                        <Army/>
                                    </ul>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Добавить свои вопросы
                            </AccordionSummary>
                            <AccordionDetails>

                                <div className="biography__block">
                                    <Question/>
                                </div>

                            </AccordionDetails>
                        </Accordion>

                        <button value={2} type='button' onClick={handleChange}
                                className='biography_wrap_button-step'>Следующий шаг
                        </button>
                    </CustomTabPanel>

                    <CustomTabPanel value={buttonActive} index={2}>
                        <div className="biography__img-info">
                            <h3>Загрузить фотографию</h3>
                            <p>Правила загрузки фотографии:
                                только лицо человека о ком биография.</p>
                        </div>


                        <div className="biography__img-wrap">
                            <ImageCropper/>
                            <ImageCropper/>
                            <ImageCropper/>
                        </div>

                        <button value={3} type='button' onClick={handleChange}
                                className='biography_wrap_button-step'>Следующий шаг
                        </button>
                    </CustomTabPanel>

                    <CustomTabPanel value={buttonActive} index={3}>
                        <Editor/>

                        <button type='button' onClick={handleChange} className='biography_wrap_button-step'>Отправить на
                            модерацию
                        </button>
                    </CustomTabPanel>
                </form>
            </section>
        </Layout>
    )
}
