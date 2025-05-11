import '@/styles/Footer.css'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-top">
      <p className="footer-title">📚 Biblioteca Popular Autogestiva</p>
      <p className="footer-sub">¡Cumplimos 30 años! · CONABIP 3188 📖</p>
    </div>

    <div className="footer-links">
      <a href="https://www.facebook.com/biblio.esteban.aguero" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com/bibliotecaaguero/" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="mailto:bibliotecaestebanaguero@gmail.com">
        <MdEmail />
      </a>
      <a href="https://wa.me/5492657500785" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
    </div>

    <p className="footer-copy">© {new Date().getFullYear()} Biblioteca Antonio Esteban Agüero</p>
  </div>
</footer>
  )
}
