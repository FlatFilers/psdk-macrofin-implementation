import { FlatfileRecord } from '@flatfile/hooks'
import { Message } from '@flatfile/configure'

/** Checks if value is falsey - returns boolean*/
const isNil = (val: any) => val === null || val === undefined || val === ''

/** Checks if value is truthy - returns boolean*/
const isNotNil = (val: any) => !isNil(val)

const vlookup = (
  record: FlatfileRecord,
  referenceField: string,
  lookupField: string,
  targetField: string,
  required: boolean = false,
  errorMessage: string = `Lookup on ${referenceField} not found.`
) => {
  const links = record.getLinks(referenceField)
  const lookupValue = links[0][lookupField]
  if (!!lookupValue) {
    record.set(targetField, lookupValue)
  }

  const targetValue = record.get(targetField)

  if (isNil(targetValue) && required === true) {
    record.addError(targetField, errorMessage)
  }
}

/** Validates Field Hook that validates a field matches a given regex value.  */
const validateRegex = (value: string, regex: RegExp, errorMessage: string) => {
  if (!regex.test(value)) {
    return [new Message(errorMessage, 'error', 'validate')]
  }
}

//Export Values
export { isNil, isNotNil, vlookup, validateRegex }
