import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'
import { range } from './utils/dates'

import { startOf, add } from 'date-arithmetic'

function AlignedWeekRange(date, _) {
  let start = startOf(date, 'day', 0)
  let end = add(start, 6, 'day')

  return range(start, end)
}

class AlignedWeek extends React.Component {
  render() {
    let { date, ...props } = this.props
    let range = AlignedWeekRange(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

AlignedWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

AlignedWeek.defaultProps = TimeGrid.defaultProps

AlignedWeek.range = AlignedWeekRange

AlignedWeek.navigate = Week.navigate

AlignedWeek.title = (date, { localizer }) => {
  let [start, ...rest] = AlignedWeekRange(date, { localizer })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default AlignedWeek
