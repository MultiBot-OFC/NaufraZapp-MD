import FormData from 'form-data'
import Jimp from 'jimp'
  
var handler = async (m, { conn, usedPrefix, command }) => {

conn.hdr = conn.hdr ? conn.hdr : {}
if (m.sender in conn.hdr)
return conn.reply(m.chat, `『✦』Espere a que la imagen solicitada sea enviado...`, m )

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!mime)

return conn.reply(m.chat, `『✦』Por favor, responda a una foto de para aplicar el efecto HD.`, m )
if (!/image\/(jpe?g|png|mp4)/.test(mime))

return conn.reply(m.chat, `『✦』El archivo: ${mime} no es compatible para este comando.`, m )
else conn.hdr[m.sender] = true

conn.reply(m.chat, '『✦』Aplicando efecto...', m )
let img = await q.download?.()

let error
try {
const This = await processing(img, "enlace")
conn.sendFile(m.chat, This, '', '『✅』Aqui tienes tu foto.', m)
} catch (er) {
error = true
} finally {
if (error) {
return conn.reply(m.chat, `『✦』Ocurrio un error al crear la foto.`, m )
}
delete conn.hdr[m.sender]
}}
  
handler.help = ['hd']
handler.tags = ['ai']
handler.command = /^(hd)$/i

handler.register = true
handler.limit = true
  
export default handler
  
async function processing(urlPath, method) {
return new Promise(async (resolve, reject) => {
let Methods = ['enhance', 'recolor', 'dehaze']
Methods.includes(method) ? (method = method) : (method = Methods[0])
let buffer,
Form = new FormData(),
scheme = 'https' + '://' + 'inferenceengine' + '.vyro' + '.ai/' + method
Form.append('model_version', 1, {
'Content-Transfer-Encoding': 'binary',
contentType: 'multipart/form-data; charset=uttf-8',
}) 
Form.append('image', Buffer.from(urlPath), {
filename: 'enhance_image_body.jpg',
contentType: 'image/jpeg',
})
Form.submit(
{
url: scheme,
host: 'inferenceengine' + '.vyro' + '.ai',
path: '/' + method,
protocol: 'https:',
headers: {
'User-Agent': 'okhttp/4.9.3',
Connection: 'Keep-Alive',
'Accept-Encoding': 'gzip',
},
}, 
function (err, res) {
if (err) reject()
let data = []
res
.on('data', function (chunk, resp) {
data.push(chunk)
})
.on('end', () => {
resolve(Buffer.concat(data))
})
res.on('error', (e) => {
reject()
})})})}
