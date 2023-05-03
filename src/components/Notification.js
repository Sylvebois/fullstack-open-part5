const Notification = ({ message, type }) => {
  if (message === '') {
    return null;
  }
  else {
    const cssStyle = {
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      background: "lightgrey",
      color: type === 'error' ? "red" : "green"
    }

    return (
      <div style={cssStyle}>
        {message}
      </div>
    );
  }
}

export default Notification;