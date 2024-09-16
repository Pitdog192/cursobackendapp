import {fileURLToPath} from 'url'
import { dirname, join } from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const createStorage = (variable) => multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, join(__dirname, `../public/${variable}`));
    },
    filename: function(req, file, cb) {
        //Los primeros 24 carácteres van a ser el ID del usuario que subió la foto, ahora cómo hacer para saber si es identificación, comprobante de domicilio, etc no lo sé
        cb(null, `${req.session.passport.user}-${formatDate(new Date()).trim()}-${file.originalname}`);
    }
});

const uploader = (variable) => multer({ storage: createStorage(variable) });

const formatDate = (dateParam) =>{
    const day = String(dateParam.getDate()).padStart(2, '0');
    const month = String(dateParam.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = dateParam.getFullYear();
    const hours = String(dateParam.getHours()).padStart(2, '0');
    const minutes = String(dateParam.getMinutes()).padStart(2, '0');
    const seconds = String(dateParam.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
    return formattedDate;
}

export {__dirname, uploader, formatDate}