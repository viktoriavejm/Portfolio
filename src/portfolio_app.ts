import express from 'express';

const app = express();

const port = 3000;

// app.use( express.static('./public') );

app.use(express.static(__dirname + '/../public') );

app.listen(port, () => {
    console.log('*****Server gestartet*****');
    console.log(`Erreichbar unter http://localhost:${port}`);
})

import ngrok from 'ngrok';

(async function() {
    const url = await ngrok.connect({
        authtoken: '2ibugo9AhJGseTWqDatcIq92Su2_82Z4FsJtcfx9aH3uhkTU',
        addr: port
    });
    console.log('*****ngrok URL*****');
    console.log(url);
})();
