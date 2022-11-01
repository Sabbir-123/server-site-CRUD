const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

// user : sabbir-12-0
// pass: 0kCv0UKKgUOu8l7T


const uri = "mongodb+srv://sabbir-12-0:0kCv0UKKgUOu8l7T@cluster0.j4x9j8z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const userCollection = client.db('MongoDBCRUD').collection('user');

        app.get('/user/', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        app.get('/user/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user)
        })

        app.put('/user/:id', async (req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const user = req.body;
            const option = {upsert: true};
            const updatedUser = {
                $set:{
                    name: user.name,
                    email: user.email,
                    password: user.password

                }

            }
            const result = await userCollection.updateMany(filter,updatedUser, option)
            res.send(result)
        })

        app.post('/user', async (req, res)=>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.delete('/user/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            res.send(result)


        })
    }
    finally{

    }
}
run().catch(err=>console.log(err))
// run()


// const users = 
//   [      {id: 1, name: 'Sabbir'},
//         {id: 2 , name: 'Rahim'}
//     ]




// const uri = "mongodb+srv://sabbir-12-0:0kCv0UKKgUOu8l7T@cluster0.j4x9j8z.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run(){
// try{
//     const userCollection = client.db('simpleNode').collection('users');
//     const user = {
//         name: 'Mahi',
//         email: 'mah@gmail.com'
//     }
//     const result = await userCollection.insertOne(user);
//     console.log(result)
// }
// finally{

// }
// }



app.get('/', (req, res)=>{
    res.send("Hello from node mongo db");
})

app.listen(port , ()=>{
    console.log(`listening from port ${port}`)
})