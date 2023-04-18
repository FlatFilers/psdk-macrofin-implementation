// Set Amounts
module.exports = async ({ recordBatch, session, logger }) => {
  await Promise.all(
    await recordBatch.records.map(async (record) => {
      //Check and Round Exchange Rate
      if (!isNaN(record.get('exchangeRate'))) {
        record.set(
          'exchangeRate',
          Number(record.get('exchangeRate')).toFixed(8)
        )
        record.addInfo(
          'exchangeRate',
          'Exchange Rate has been rounded to 8 decimal places'
        )
      }

      //Calculate Transaction Amount
      if (record.get('itemLine_Quantity') && record.get('itemLine_Rate')) {
        record.set(
          'Transaction_Amount',
          record.get('itemLine_Quantity') * record.get('itemLine_Rate')
        )
        record.addInfo(
          'Transaction_Amount',
          'Transaction Amount has been calculated'
        )
      }

      //Calculate Base Currency Amount
      if (
        !isNaN(record.get('exchangeRate')) &&
        record.get('Transaction_Amount')
      ) {
        record.set(
          'Base_Currency_Amount',
          record.get('exchangeRate') * record.get('Transaction_Amount')
        )
        record.addInfo(
          'Base_Currency_Amount',
          'Base Currency Amount has been calculated'
        )
      }
      //Check and Round Transaction Amount
      if (record.get('Transaction_Amount')) {
        record.set(
          'Transaction_Amount',
          Number(record.get('Transaction_Amount')).toFixed(2)
        )
        record.addInfo(
          'Transaction_Amount',
          'Exchange Rate has rounded set to 2 decimal places'
        )
      }
      //Check and Round Base Currency Amount
      if (record.get('Base_Currency_Amount')) {
        record.set(
          'Base_Currency_Amount',
          Number(record.get('Base_Currency_Amount')).toFixed(2)
        )
        record.addInfo(
          'Base_Currency_Amount',
          'Exchange Rate has rounded set to 2 decimal places'
        )
      }
    })
  )
}
