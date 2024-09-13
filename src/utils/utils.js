import {fileURLToPath} from 'url'
import { dirname } from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'/../public/images')
    },
    filename: function(req, file, cb){
        cb(null, formatDate(new Date()).trim() + '-' + file.originalname)
    }
})

const formatDate = (dateParam) =>{
    const day = String(dateParam.getDate()).padStart(2, '0');
    const month = String(dateParam.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = dateParam.getFullYear();
    const hours = String(dateParam.getHours()).padStart(2, '0');
    const minutes = String(dateParam.getMinutes()).padStart(2, '0');
    const seconds = String(dateParam.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

const uploader = multer({storage})
export {__dirname, uploader, formatDate}