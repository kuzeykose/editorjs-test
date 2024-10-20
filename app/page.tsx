'use client';

import { useEffect, useState, useRef } from 'react';

import EditorJS, { OutputData } from '@editorjs/editorjs';

import Header from '@editorjs/header';
import CodeTool from '@editorjs/code';

export default function Home() {
    const [data, setData] = useState<OutputData>();
    const editor = useRef<EditorJS>();

    useEffect(() => {
        editor.current = new EditorJS({
            holder: 'editorjs',
            tools: {
                code: CodeTool,
                header: Header
            },
            onChange: (api, event) => {
                console.log('Now I know that Editor\'s content changed!', event)
                console.log(api)
            }
        })
    }, [])

    const saveHandler = () => {
        editor.current?.save().then((outputData) => {
            console.log('Article data: ', outputData)
            setData(outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }

    return (
        <div>
            <div className='bg-red-100' id="editorjs" />

            <div>
                {JSON.stringify(data,null,2)}
            </div>

            <button onClick={saveHandler}>save</button>
        </div>
    );
}
