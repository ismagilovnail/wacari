import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { TextField } from '@mui/material';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

export default function SocialLink({ name }) {
    const [link, setLink] = useState('');

    const update = (e) => {
        setLink(e.target.value);
    }

    return (
        <li>
            <div className="biography__name">
                <p>
                    {name}
                </p>
                <a className="my-anchor-element" ><HelpOutlineRoundedIcon /></a>
                <Tooltip anchorSelect=".my-anchor-element">
                    :(
                </Tooltip>
            </div>

            <div className="biography__input">
                <TextField
                    label={name}
                    value={link}
                    onChange={e => update(e)}
                />
            </div>
        </li>
    )
}
