import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div className="text-center p-3 text-dark fixed-bottom">
            © 2023 Copyright:
            <FontAwesomeIcon icon={faGithub} className='ms-3'/>
            <a className="text-dark ms-2" href="https://github.com/analiaacosta2023">Analía Acosta</a>
        </div>
  )
}

export default Footer