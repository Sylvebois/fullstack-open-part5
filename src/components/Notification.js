import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === '') {
    return null
  }
  else {
    const cssStyle = {
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      background: 'lightgrey',
      color: type === 'error' ? 'red' : 'green'
    }

    return (
      <div style={cssStyle} className={type}>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['', 'error', 'success']).isRequired
}

export default Notification