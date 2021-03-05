
import { useState } from 'react'
import Papa from 'papaparse'

export default function ParseSpike() {

    //state to hold file
    const [file, setFile] = useState('')
    const [parse, setParse] = useState('')

    function showFile(event){
        const newFile = (event.target.files[0]);
        //use parser here
        console.log(event.target.files[0])
        console.log('newFile is:', newFile)
        Papa.parse(event.target.files[0], {
            complete: function(results){
                console.log(results)
                setParse(results);
            }
        })
        console.log('results from parse', parse);
    }

    console.log('parse data:', parse.data)
    return (
        <>
        <div className="App">
            <form>
                <input
                    type="file"
                    value={file}
                    id="fileItem"
                    onChange={(event)=>showFile(event)}>
                </input>

            </form>
            </div>
        </>
    )
}
