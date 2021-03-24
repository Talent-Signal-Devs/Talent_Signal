import { useState } from 'react'
import Papa from 'papaparse'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#DDDDDD',
    padding: '20px 0',
    borderRadius: '5px',
    width: '25%',
    margin: 'auto'
  }
}))



export default function AdminUpload() {

  const classes = useStyles()
  //state to hold file
  //isReady to conditionally render submit button
  const [parse, setParse] = useState('');
  const [isReady, setIsReady] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

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

  //Packing data for server from a manual button click
  function manualPackage(parsedData) {
    // console.log('in packageData', parsedData)
    const parsedReport = [];
    for (let payment of parsedData) {
      const studentInfo = {
        id: payment[0],
        date: payment[1],
        date_scheduled: payment[2],
        income: payment[3],
        amount: payment[4],
        payment_status: payment[5],
        pending_date: payment[6],
        complete_date: payment[7],
        student: payment[8],
        provider: payment[9],
        product: payment[10],
        contract_id: payment[11],
        fee: payment[12],
        paid_by_sponsor: payment[13],
        sponsor: payment[14],
        full_prepayment: payment[15],
        sponsor_name: payment[16],
        count: payment[17]
      }
      parsedReport.push(studentInfo)
    }
    // console.log('in packageData with parsedReport:', parsedReport)
    //sending to saga, to be used in server
    dispatch({ type: 'ADD_NEW_CSV_MANUAL', payload: parsedReport })
    setIsReady(false)
    setTimeout(() => history.push('/admin/payouts'), 200)
  }

  return (
    <>
      <div className={classes.container}>
        <form>
          {isReady ?
            <Button
              variant='contained'
              color='primary'
              onClick={() => manualPackage(parse)}>
              Upload
              </Button> :
            <Button
              variant="contained"
              color="primary"
              component="label">
              Upload New CSV
              <input
                type="file"
                id="file-upload"
                accept=".csv"
                hidden
                onChange={(event) => parseFile(event)}>
              </input>
            </Button>}
        </form>

      </div>
    </>
  )
}
