const Notification = ({ message }) => {
  const noteStyle = {
    color: 'darkblue',
    background: 'lightblue',
    fontSize: 14,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={noteStyle}>
      {message}
    </div>
  )
}

export default Notification