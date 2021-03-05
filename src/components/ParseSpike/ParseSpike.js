
import { useState } from 'react'
import Papa from 'papaparse'
//in parse, we need to build an array full of objects. each object needs to represent an index of the array>

export default function ParseSpike() {

    //state to hold file
    const [parse, setParse] = useState('');
    const [isReady, setIsReady] = useState(false)

    function parseFile(event) {
        Papa.parse(event.target.files[0], {
            complete: function (results) {
                console.log(results)
                setParse(results.data);
                setIsReady(true)
            }
        })

    }
    console.log('log outside of parseFile', parse)



    function packageData(parsedData) {
            console.log('in package with data', parsedData)
            console.log('done parsing')
    }

    return (
        <>
            <div className="App">
                <form>
                    <input
                        type="file"
                        id="fileItem"
                        onChange={(event) => parseFile(event)}>
                    </input>
                    {isReady? <button onClick={()=>packageData(parse)}>Ready</button> : <span></span>}
                    {JSON.stringify(parse)}
                </form>
            </div>
        </>
    )
}
