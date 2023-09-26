import React from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import baseConst from '../../data/const'
import { useCookies } from 'react-cookie'

function CSVExportButton(props: { forecastRequestId: any; reportType: any }) {
  const { forecastRequestId, reportType } = props
  const [cookie] = useCookies(['token'])

  const handleExportCSV = () => {
    const { token } = cookie
    if (forecastRequestId && reportType) {
      //http://localhost:8000/api/v1/forecast/export-csv/20/all_position/
      const url = `${baseConst.apiUrl}v1/forecast/export-csv/${forecastRequestId}/${reportType}/`

      axios
        .get(url, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          // Trigger the CSV file download
          const csvData = new Blob([response.data], { type: 'text/csv' })
          const csvURL = window.URL.createObjectURL(csvData)
          const link = document.createElement('a')
          link.href = csvURL
          link.setAttribute('download', `forecast_report_${forecastRequestId}_${reportType}.csv`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(error => {
          console.error('Error exporting CSV:', error)
        })
    }
  }

  return (
    <div>
      <Button
        sx={{ float: 'right' }}
        size='small'
        variant='contained'
        color='success'
        onClick={() => handleExportCSV()}
      >
        Export
      </Button>
    </div>
  )
}

export default CSVExportButton
