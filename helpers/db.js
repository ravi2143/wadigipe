const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

const readSession = async () =>{
    try{
        const res = client.query('SELECT * FORM wa_session ORDER BY created_at DESC LIMIT 1');
        if(res.rows.length) return res.rows[0].session;
        return '';
    }catch(err){
        throw err;
    }
}

const saveSession = () => {
    client.query('INSERT INTO wa_session (session) VALUES($1)', [session], (err, results) => {
        if(err){
            console.error('Failed to Save Session!',err);
        }else{
            console.log('Session saved!');
        }
    });
}

const removeSession = () => {
    client.query('DELETE FROM wa_session', (err, results)=>{
        if(err){
            console.error('Faild to Remove session!',err);
        }else{
            console.log('Session deleted!')
        }
    });
}

module.exports={
    readSession,
    saveSession,
    removeSession
}