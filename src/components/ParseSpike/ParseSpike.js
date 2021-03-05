
import { useState } from 'react'
import Papa from 'papaparse'
//in parse, we need to build an array full of objects. each object needs to represent an index of the array>

export default function ParseSpike() {

    //state to hold file
    //isReady to conditionally render submit button
    const [parse, setParse] = useState('');
    const [isReady, setIsReady] = useState(false)

    //parses CSV and sets state to store value of parsed data
    function parseFile(event) {
        Papa.parse(event.target.files[0], {
            complete: function (results) {
                console.log(results.data)
                setParse(results.data);
                setIsReady(true)
            }
        })

    }


//I'm intending this function to package up and send the data to a saga/reducer
//have it running on a conditionally rendered button to deal withy async timing of setting state varaible
//
    function packageData(parsedData) {
            console.log('in package with data', parsedData)
    }

//could also run function automatically
    function autoPackage(ready){
        if(ready){
        console.log('in autoPackage', parse)
        }
    }
    autoPackage(isReady)

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
