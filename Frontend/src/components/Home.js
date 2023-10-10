import Notes from './Notes'

const Home = (p) => {
  return (
    <div className="">
      <Notes showAlert={p.showAlert} />
    </div>
  )
}

export default Home