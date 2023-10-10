import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = (p) => {
  const host = `http://localhost:3300`
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token & redirect
      localStorage.setItem('token', json.authToken)
      navigate('/')
      p.showAlert('Logged In Successfully', 'success')
    } else {
      p.showAlert('Email ID/password was incorrect. Please try again', 'danger')
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email ID</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login