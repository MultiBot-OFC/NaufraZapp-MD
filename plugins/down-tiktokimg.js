import fetch from 'node-fetch'

var handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `❮📌❯ » Ingrese un enlace de tiktok img para usar este comando.`, m )
m.react(rwait)
if (!(text.includes('http://') || text.includes('https://'))) return conn.reply(m.chat, `❮⛔❯ » El texto ingressdo no contiene el HTTPS://`, m )
m.react(error)
if (!text.includes('tiktok.com')) return conn.reply(m.chat, `❮❌❯ » Debe de ingresar un enlace de tiktok img.`, m )
m.react(error)

try {

let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${global.lolkeysapi}&url=${text}`)
let anu = await res.json()
if (anu.status != '200') throw Error(anu.message)
anu = anu.result
if (anu.length == 0) throw Error('Error : no data')
let c = 0
for (let x of anu) {
if (c == 0) await conn.sendMessage(m.chat, { image: { url: x }, caption: `✅ *Se ha enviado 1 de ${anu.length} imágenes.*\n_El resto podrá ser visible en el chat privado del bot_` }, { quoted : m })
else await conn.sendMessage(m.sender, { image: { url: x } }, { quoted : m })
c += 1
}
m.react(done)
} catch (e) {
console.log(e)
m.react(error)
return conn.reply(m.chat, `❮❌❯ » Ocurrio un error inesperado en el comando, reportalo al creador ddl bot.`, m )
}

}
handler.help = ['tiktokslide']
handler.tags = ['descargas']
handler.command = /^((tt|tiktok)imagen)$/i

export default handler