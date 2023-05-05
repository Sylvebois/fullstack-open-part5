import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ showLabel, hideLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const displayedWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{showLabel}</button>
      </div>
      <div style={displayedWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
}

export default Togglable