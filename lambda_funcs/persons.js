// lambda/persons.js
const Airtable = require('airtable')

Airtable.configure({
  endpoint: process.env.CLOUDFRONT_URL, // CDN URL
  apiKey: process.env.AIRTABLE_KEY // see Netlify config
})
const base = Airtable.base(process.env.AIRTABLE_BASE)

exports.handler = function (event, context, callback) {
  const allRecords = []
  base('persons')
    .select({
      maxRecords: 100,
      view: 'all'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          // include person id in fields, delete extraneous data & push into array returned
          record._rawJson.fields.id = record.id
          delete record._rawJson.fields.project_list
          delete record._rawJson.fields.projects
          delete record._rawJson.fields['projects 2']
          allRecords.push(record._rawJson.fields)
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          callback(err)
        } else {
          const body = JSON.stringify(allRecords)
          const response = {
            statusCode: 200,
            body: body,
            headers: {
              'content-type': 'application/json',
              'cache-control': 'Cache-Control: max-age=300, public'
            }
          }
          callback(null, response)
        }
      }
    )
}
