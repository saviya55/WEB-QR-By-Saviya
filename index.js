
const express = require("express");
const app = express();





const pino = require("pino");
let { toBuffer } = require("qrcode");
const path = require('path');
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");
const PORT = process.env.PORT ||  5000
const MESSAGE = process.env.MESSAGE ||  `
╔════◇
║ *『 ✨🔰THANK YOU FOR USE PRABATH-MD🔰✨ 』*
╚════════════════════════╝

👋 Hello, Welcome to PRABATH-MD WhatsApp User Bot

*🌏. Website:* https://prabath--md-official.vercel.app/
*👨‍💻. Owners:* Prabath Kumara & Sachintha
*🎡. Github:*  https://github.com/prabathLK/PRABATH-MD
*🪩. Our community:* https://chat.whatsapp.com/BdB1HCIvOhtFMO6FIocB6N
*🪄. Our channel:* https://whatsapp.com/channel/0029Va5dJKyJpe8oqDXUjI3x
`











if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
  };
  
  app.use("/", async(req, res) => {

  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function SUHAIL() {
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
    try {
      let Smd =SuhailWASocket({ 
        printQRInTerminal: false,
        logger: pino({ level: "silent" }), 
        browser: Browsers.macOS("Desktop"),
        auth: state 
        });


      Smd.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;
        if (qr) { res.end(await toBuffer(qr)); }


        if (connection == "open"){
          await delay(3000);
          let user = Smd.user.id;


//===========================================================================================
//===============================  SESSION ID    ===========================================
//===========================================================================================

          let CREDS = fs.readFileSync(__dirname + '/auth_info_baileys/creds.json')
          var Scan_Id = Buffer.from(CREDS).toString('base64')
         // res.json({status:true,Scan_Id })
          console.log(`
====================  SESSION ID  ==========================                   
SESSION-ID ==> ${Scan_Id}
-------------------   SESSION CLOSED   -----------------------
`)


          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });
          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });
          await delay(1000);
          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}


        }

        Smd.ev.on('creds.update', saveCreds)

        if (connection === "close") {            
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            // console.log("Reason : ",DisconnectReason[reason])
            if (reason === DisconnectReason.connectionClosed) {
              console.log("Connection closed!")
             // SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server!")
            //  SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...")
              SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut!")
             // SUHAIL().catch(err => console.log(err));
            }  else {
                console.log('Connection closed with bot. Please run again.');
                console.log(reason)
              //process.exit(0)
            }
          }



      });
    } catch (err) {
        console.log(err);
       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 
    }
  }








  SUHAIL().catch(async(err) => {
    console.log(err)
    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 


    //// MADE WITH 

});


  })


app.listen(PORT, () => console.log(`App listened on port http://localhost:${PORT}`));



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SCAN QR CODE</title>
    <style>
        body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            transition: background-color 2s ease-in-out;
        }

        img {
            max-width: 100%;
            max-height: 100%;
            display: block;
        }

        footer {
            text-align: center;
            position: fixed;
            bottom: 10px;
            width: 100%;
            color: white;
        }
    </style>
</head>
<body>

    <img id="qrImage" src="https://saviya-md-qr.onrender.com" alt="QR Code Image">

    <footer>
        saviya-md
    </footer>

    <script>
        function changeBackgroundColor() {
            const colors = [
                'rgb(255, 0, 0)',
                'rgb(0, 255, 0)',
                'rgb(0, 0, 255)',
                // Add more colors as needed
            ];

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        }

        // Change background color every 5 seconds (5000 milliseconds)
        setInterval(changeBackgroundColor, 5000);
    </script>

</body>
</html>
