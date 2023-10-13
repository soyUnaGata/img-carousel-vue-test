export default {
    async list(page, count){
        return await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`)
            .then(x => x.json())
            .then(x => x.map((img, i) => ({ url: img.download_url, displayed: false })))
    }
}