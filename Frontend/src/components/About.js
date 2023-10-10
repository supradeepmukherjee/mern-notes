import { useContext,useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext)
  useEffect(() => {
    // a.update()
  }, [])
    return (
    <div>
      {/* About {a.state.name} and he does {a.state.work} */}
    </div>
  )
}

export default About