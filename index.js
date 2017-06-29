const net = require("net")

const LOCAL_PORT = process.argv[2]
const REMOTE_HOST = process.argv[3]
const REMOTE_PORT = process.argv[4]

const serv = net.createServer({}, socket => {

    const client = new net.createConnection({port: REMOTE_PORT, host: REMOTE_HOST})

    socket.on("data", data => client.write(data))
    client.on("data", data => socket.write(data))

    socket.on("error", console.log)
    client.on("error", console.log)

    client.on("end", () => socket.destroy())
})

serv.listen(LOCAL_PORT, () => console.log(`Listening on ${LOCAL_PORT}`))
