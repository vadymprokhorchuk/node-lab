const https = require("https");
const {parse} = require('node-html-parser')
const crypto = require('crypto');
const fs = require("fs");
const { createServer, Server, Socket } = require('node:net');

const folder = './news'
async function getNewsHTML(){
    const options = {
        method: 'GET',
        hostname: 'fakty.com.ua',
        path: `/ua/news/`,
    }

    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', async () => {
                resolve(data)
            })
        }).on("error", async (err) => {
            console.log(err)
        });
    })
}

async function scrap(){
    let html = await getNewsHTML()
    const root = parse(html);
    const newsBlock = root.querySelector('.news-list')
    const news = newsBlock.querySelectorAll('.item-content')
    for (const thread in news){
        const headHTML = news[thread].querySelector('.h3-news')
        const headText = headHTML.textContent.replaceAll('\t', '').replaceAll('\n', '')

        const descriptionHTML = news[thread].querySelector('.tlc-2')
        const descriptionText = descriptionHTML.textContent.replaceAll('\t', '').replaceAll('\n', '')
        const fileName = crypto.createHash('md5').update(headText).digest('hex')

        const content = `${headText}\n\n${descriptionText}`
        fs.writeFileSync(`${folder}/${fileName}.txt`, content,{encoding:'utf8',flag:'w'})

    }
}

async function main(){
    await scrap()
    const interval = setInterval(async function () {
        await scrap()
    }, 60000)
    const port = 9903;

    const server= createServer((clientSocket) => {
        clientSocket.on('data', clientData => {
            const urlPath = clientData.toString().split('\r')[0].split(' ')[1]
            let content = ''
            if (urlPath === '/'){
                const files = fs.readdirSync(folder)
                content = files.map(file=>{return `<a href="/news/${file}">${file}</a>`}).join('<br><br>')
            }else if (urlPath.split('/')[1] === 'news'){
                const fileName = urlPath.split('/')[2]
                try{
                    content = fs.readFileSync(`${folder}/${fileName}`, 'utf8').replaceAll('\n', '<br>')
                }catch (err){
                    content = 'Error.'
                }
            }else{
                content = 'Not found.'
            }

            clientSocket.write([
                'HTTP/1.1 200 OK',
                'Content-Type: text/html; charset=utf-8',
                'Status: 200',
                '',
                '',
                content,
                '',
                '',
            ].join('\r\n'));

            clientSocket.end()
        });
    });

    server.listen(port, () => {
        console.log(`[server] opened server: ${JSON.stringify(server.address())}`);
    });

}
main()
