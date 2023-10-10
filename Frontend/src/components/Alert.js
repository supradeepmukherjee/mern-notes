const Alert = (p) => {
    return (
        <div className="" >
            {
                p.alert && <div className={`alert alert-${p.alert.type}`} role="alert">
                    {p.alert.msg}
                </div>
            }
        </div>
    )
}

export default Alert