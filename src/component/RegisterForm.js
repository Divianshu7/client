const RegisterForm = ({ handleSubmit, name, setName, email, setEmail, password, setPassword }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group mb-3 mt-3'>
                <label className='form-label' >Your Name</label>
                <input type='text' className='form-control' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' >Your Email</label>
                <input type='email' className='form-control' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label' >Your password</label>
                <input type='password' className='form-control' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className='btn btn-primary' type='submit'>register</button>
        </form>
    )
}
export default RegisterForm