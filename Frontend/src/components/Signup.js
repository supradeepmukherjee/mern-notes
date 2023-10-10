import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = (p) => {
  const host = `http://localhost:3300`
  const [details, setDetails] = useState({ name: '', email: '', password: '', cpassword: '' })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: details.email,
        name: details.name,
        password: details.password
      })
    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/')
      p.showAlert('Account created Successfully', 'success')
    } else {
      p.showAlert('User with the same email ID already exists', 'danger')
    }
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input required onChange={handleChange} type="text" className="form-control" id="name" name='name' minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input required onChange={handleChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required onChange={handleChange} minLength={6} type="password" name="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input required onChange={handleChange} minLength={6} type="password" name="cpassword" className="form-control" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup