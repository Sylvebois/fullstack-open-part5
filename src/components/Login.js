import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsername, handlePassword, handleClick }) => {
  return (
    <>
      <h2>Log into App</h2>
      <form>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePassword(target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>Login</button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm