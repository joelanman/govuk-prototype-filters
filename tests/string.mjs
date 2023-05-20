import test from 'ava'
import {
  govukMarkdown,
  isString,
  noOrphans,
  pluralise,
  slugify,
  startsWith
} from '../lib/string.js'

test('Converts a Markdown formatted string to HTML', t => {
  t.is(
    govukMarkdown(`He said, -- "A 'simple' sentence..." --- unknown`),
    '<p class="govuk-body">He said, &#8211; &#8220;A &#8216;simple&#8217; sentence&#8230;&#8221; &#8212; unknown</p>\n'
  )
  t.is(
    govukMarkdown("# Large heading", { headingsStartWith: 'l' }),
    '<h1 class="govuk-heading-l" id="large-heading">Large heading</h1>'
  )
})

test('Check if a value is classified as a `String`', t => {
  t.true(isString('Number 10'))
  t.false(isString(10))
})

test('Gets the plural form for an item for a given number of items', t => {
  t.is(pluralise(1, 'mouse'), '1 mouse')
  t.is(pluralise(2, 'house'), '2 houses')
  t.is(pluralise(2, 'house', { number: false }), 'houses')
  t.is(pluralise(2, 'mouse', { plural: 'mice' }), '2 mice')
  t.is(pluralise(2, 'mouse', { plural: 'mice', number: false }), 'mice')
})

test('Inserts non-breaking space between the last two words of a string', t => {
  t.is(noOrphans('Department for Education'), 'Department for&nbsp;Education')
  t.is(noOrphans('Government'), 'Government')
})

test('Converts a string to kebab-case', t => {
  t.is(slugify('Department for Education'), 'department-for-education')
})

test('Checks if a string starts with a value', t => {
  t.true(startsWith('Department of Transport', 'Department'))
})
