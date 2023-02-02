const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword }) => {
    return (
        <form onSubmit={handleSubmit}>

            <div className='form-group mb-3'>
                <label className='form-label' >Your Email</label>
                <input type='email' className='form-control' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' >Your password</label>
                <input type='password' className='form-control' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button disabled={!email || !password} className='btn btn-primary' type='submit'>Login</button>
        </form>
    )
}
export default LoginForm